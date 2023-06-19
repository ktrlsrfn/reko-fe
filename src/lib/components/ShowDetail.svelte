<script lang="ts">
  import StarIcon from '~icons/material-symbols/star-rounded';
  import DotIcon from '~icons/ci/dot-03-m'

  export let show: any;
</script>

<div class="flex-col font-sans font-bold text-white relative flex h-full overflow-auto px-16 py-28" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{show.backdrop}');background-size: cover; background-position: center">
  <div class="flex flex-col items-start">
    <h1 class="text-7xl my-4">{show.title}</h1>
    <div class="relative flex text-3xl h-full">
      <span>{show.year}</span>
      <DotIcon />
      <div class="flex gap-1">
        <StarIcon class="mt-[-2px] text-yellow-500"/>
        <span>{show.rating.toFixed(1)}</span>
      </div>
    </div>
    <p class="text-xl">{show.overview}</p>
  </div>
  {#if show.video}
    <div class="w-full p-12">
      <div class="relative w-full h-48 pt-[56.25%]">
        <iframe src="{show.video}" class="absolute w-full h-full border-none top-0 left-0 right-0 bottom-0" title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  {/if}
</div>