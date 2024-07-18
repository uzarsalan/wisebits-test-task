<script lang="ts">
  import CoffeeCard from "$lib/components/CoffeeCard.svelte";
  import { coffeeStore } from "$lib/stores";

  const items = coffeeStore.coffeeItems;
  const isLoading = coffeeStore.isLoading;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-4">
  <h1 class="text-xl font-bold">Cofeeshop</h1>

  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each $items as item}
      <CoffeeCard {item} />
    {/each}
  </div>
  <button
    class="rounded px-3 py-1 border-solid border border-black shadow hover:bg-black hover:text-white transition disabled:opacity-50"
    disabled={$isLoading}
    on:click={() => coffeeStore.getNextCoffee()}
    >{$isLoading ? "Loading..." : "Load one more"}</button
  >
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }
</style>
