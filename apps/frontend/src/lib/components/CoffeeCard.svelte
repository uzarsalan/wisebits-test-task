<script lang="ts">
  import type { CoffeeGetDto } from "shared-types";
  import Placeholder from "$lib/components/Placeholder.svelte";

  $: isImageLoading = true;

  async function onImageLoaded() {
    setTimeout(() => {
      isImageLoading = false;
    }, 20);
  }

  export let item: CoffeeGetDto;
</script>

<div
  class="relative shadow rounded h-[300px] overflow-hidden flex flex-col justify-end group hover:shadow-xl transition duration-500 hover:scale-[0.98]"
>
  <div class="absolute inset-0 flex flex-col justify-center items-center">
    <img
      loading="lazy"
      decoding="async"
      on:load={onImageLoaded}
      class={"object-cover group-hover:scale-105 transition duration-500 w-full h-full transition duration-500 " +
        (isImageLoading ? "opacity-0 scale-[1.2]" : "opacity-1 scale-[1]")}
      src={item.image.file}
      alt={item.blend_name}
    />
    <div
      class={"absolute inset-0 transition duration-500 flex flex-col items-center justify-center " +
        (isImageLoading ? "opacity-[1]" : "opacity-0")}
    >
      <Placeholder />
    </div>
  </div>

  <div class="z-20 absolute top-2 right-2 text-white">{item.intensifier}</div>

  <div
    class="z-10 p-2 bg-[linear-gradient(to_top,#000,rgba(0,0,0,0))] group-hover:pt-[200px] text-white pt-4 translate-y-[62px] group-hover:translate-y-0 transition-all duration-500 flex flex-col"
  >
    <p class="opacity-0 group-hover:opacity-80 text-sm transition duration-500">
      {item.origin}
    </p>
    <p class="text-lg font-bold uppercase">{item.blend_name}</p>
    <p>{item.variety}</p>
    <div class="w-full overflow-x-auto scrollbar-hide mt-2">
      <div class="flex gap-2">
        {#each item.notes.split(",").map((note) => note.trim()) as note}
          <div
            style={`background-color:hsl(${Math.random() * 360},60%,70%)`}
            class="shrink-0 text-xs opacity-90 p-1 bg-white rounded text-black font-bold hover:opacity-100 transition cursor-pointer"
          >
            <div>{note}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
