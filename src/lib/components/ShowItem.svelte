<script lang="ts">
  import BookmarkBorderIcon from '~icons/ic/baseline-bookmark-border';
  import BookmarkIcon from '~icons/ic/baseline-bookmark';
  import StarIcon from '~icons/material-symbols/star-rounded';
  import PlayIcon from '~icons/material-symbols/play-arrow-rounded';

  export let type = 'movie';
  export let show: any = {
    id: null,
    title: 'No title',
    year: '0000',
    rating: '0.0',
    backdrop: ''
  };
  export let watchlist: any;

  $: bookmarked = !!watchlist.find((x: any) => x.id === show.id && x.type === type);

  async function handleBookmark() {
    bookmarked = !bookmarked

    const request = await fetch('/api/show/watchlist/set', {
      method: 'POST',
      body: JSON.stringify({
        id: show.id,
        type,
        action: bookmarked ? 'add' : 'remove'
      })
    });

    if (request.status !== 200) {
      bookmarked = !bookmarked;
      return;
    }
  }
</script>

<div class="min-w-96 w-96 h-48 rounded-2xl overflow-hidden relative bg-slate-900">
  <div class="back-grad flex flex-col place-content-between w-full h-full p-2 font-sans font-bold text-white absolute">
    <div>
      <div on:click={handleBookmark} on:keydown={handleBookmark} class="cursor-pointer flex w-10 h-10 relative transition">
          <BookmarkIcon class="w-full h-full text-white absolute z-10 opacity-0 hover:opacity-100 transition duration-75 { bookmarked ? 'opacity-100' : '' }" />
          <BookmarkBorderIcon class="w-full h-full text-white z-0" />
      </div>
    </div>
    <div class="flex place-content-between items-center px-2 gap-2 bg-[linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)]">
      <div>
        <h3>{show.title}</h3>
        <div class="flex gap-4">
          <span>{show.year}</span>
          <div class="flex gap-1">
            <StarIcon class="mt-[2px] text-yellow-500"/>
            <span>{show.rating}</span>
          </div>
        </div>
      </div>
      <a href='/{type}/{show.id}'>
        <PlayIcon class="w-14 h-14 hover:scale-[1.25] transition duration-100 cursor-pointer" />
      </a>
    </div>
  </div>
  <img src="{show.backdrop}" alt="poster" class="w-full h-full object-cover"/>
</div>

<style>
  .back-grad {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.45) 100%)
  }
</style>