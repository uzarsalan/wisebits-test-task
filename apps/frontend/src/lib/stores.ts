import type { CoffeeGetDto } from "shared-types";
import { writable } from "svelte/store";
import toast from "svelte-french-toast";

const API_BASE = "http://localhost:3000";

const AUTOLOAD_TIME = 30_000;

type CoffeeStoreData = {
  cursor: number;
  items: CoffeeGetDto[];
};

const trottler = <T extends () => any>(
  fn: T,
  time = 30_000,
  timer?: NodeJS.Timeout
) => {
  const func = () => {
    fn();
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, time);
  };
  return func;
};

function createCoffeStore(
  { cursor: initialCursor, items }: CoffeeStoreData = { cursor: 0, items: [] }
) {
  const coffeeItemsStore = writable<CoffeeGetDto[]>(items);
  const isLoadingStore = writable(false);

  let cursor = initialCursor;

  async function getNextCoffeeFromApi() {
    isLoadingStore.set(true);
    try {
      const item = await fetch(`${API_BASE}/getCoffee/${++cursor}`).then(
        (r) => {
          if (!r.ok) {
            throw new Error(`HTTP error! status: ${r.status}`);
          }
          return r.json();
        }
      );
      coffeeItemsStore.update((val) => [...val, item]);
    } catch (error) {
      --cursor;
      toast.error("Error loading coffee");
      console.error("Failed to get next coffee", error);
    } finally {
      isLoadingStore.set(false);
    }
  }

  const getNextCoffee = trottler(getNextCoffeeFromApi, AUTOLOAD_TIME);

  getNextCoffee();

  return {
    coffeeItems: coffeeItemsStore,
    isLoading: isLoadingStore,
    getNextCoffee,
  };
}

export const coffeeStore = createCoffeStore();
