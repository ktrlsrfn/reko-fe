<script lang="ts">
	import ShowItem from "$lib/components/ShowItem.svelte";

  export let data;
  $: watchlist = data.watchlist;
  $: slug = data.slug;

  const showTypes: any = {
    all: [
      {
        name: 'Popular Movies',
        link: '/api/movie/list?query=popular',
        type: 'movie'
      },
      {
        name: 'Top Rated Movies',
        link: '/api/movie/list?query=top',
        type: 'movie'
      },
      {
        name: 'Upcoming Movies',
        link: '/api/movie/list?query=upcoming',
        type: 'movie'
      },
      {
        name: 'Now Playing Movies',
        link: '/api/movie/list?query=now_playing',
        type: 'movie'
      },
      {
        name: 'Top Rated TV Shows',
        link: '/api/tv/list?query=top',
        type: 'tv'
      },
      {
        name: 'Popular TV Shows',
        link: '/api/tv/list?query=popular',
        type: 'tv'
      },
    ],
    movie: [
      {
        name: 'Action shows',
        link: '/api/movie/list?genre[]=action',
        type: 'movie'
      },
      {
        name: 'Comedy shows',
        link: '/api/movie/list?genre[]=comedy',
        type: 'movie'
      },
      {
        name: 'Drama shows',
        link: '/api/movie/list?genre[]=drama',
        type: 'movie'
      },
      {
        name: 'Family shows',
        link: '/api/movie/list?genre[]=family',
        type: 'movie'
      },
      {
        name: 'History shows',
        link: '/api/movie/list?genre[]=history',
        type: 'movie'
      },
      {
        name: 'Horror shows',
        link: '/api/movie/list?genre[]=horror',
        type: 'movie'
      },
    ],
    tv: [
      {
        name: 'Action / Adventure shows',
        link: '/api/tv/list?genre[]=action_adventure',
        type: 'tv'
      },
      {
        name: 'Comedy shows',
        link: '/api/tv/list?genre[]=comedy',
        type: 'tv'
      },
      {
        name: 'Drama shows',
        link: '/api/tv/list?genre[]=drama',
        type: 'tv'
      },
      {
        name: 'Family shows',
        link: '/api/tv/list?genre[]=family',
        type: 'tv'
      },
      {
        name: 'Mystery shows',
        link: '/api/tv/list?genre[]=mystery',
        type: 'tv'
      },
      {
        name: 'Reality shows',
        link: '/api/tv/list?genre[]=reality',
        type: 'tv'
      },
    ],
    animation: [
      {
        name: 'Action movies',
        link: '/api/movie/list?genre[]=action&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'Comedy movies',
        link: '/api/movie/list?genre[]=comedy&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'Drama movies',
        link: '/api/movie/list?genre[]=drama&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'Family movies',
        link: '/api/movie/list?genre[]=family&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'History movies',
        link: '/api/movie/list?genre[]=history&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'Horror movies',
        link: '/api/movie/list?genre[]=horror&genre[]=animation',
        type: 'movie'
      },
      {
        name: 'Action / Adventure TV shows',
        link: '/api/tv/list?genre[]=action_adventure&genre[]=animation',
        type: 'tv'
      },
      {
        name: 'Comedy TV shows',
        link: '/api/tv/list?genre[]=comedy&genre[]=animation',
        type: 'tv'
      },
      {
        name: 'Drama TV shows',
        link: '/api/tv/list?genre[]=drama&genre[]=animation',
        type: 'tv'
      },
      {
        name: 'Family TV shows',
        link: '/api/tv/list?genre[]=family&genre[]=animation',
        type: 'tv'
      },
      {
        name: 'Mystery TV shows',
        link: '/api/tv/list?genre[]=mystery&genre[]=animation',
        type: 'tv'
      },
      {
        name: 'Reality TV shows',
        link: '/api/tv/list?genre[]=reality&genre[]=animation',
        type: 'tv'
      },
    ]
  };


  $: currentShows = showTypes[slug] ?? [];

  async function loadShows(showConfig: any) {
    const {
      link
    } = showConfig;

    const response = await fetch(link);

    const data = (await response.json()).content;

    return data;
  }
</script>

<div class="flex flex-col w-full gap-8 p-4 overflow-hidden">
  {#each currentShows as type}
    <div class="flex flex-col">
      <h2 class="p-4 font-sans font-bold text-xl text-[#9e822f]">{type.name}</h2>
      <div class="flex overflow-auto">
        <ul class="flex gap-2 justify-center overflow-auto flex-shrink-0">
          {#await loadShows(type)}
            <h2>Loading</h2>
          {:then shows}
            {#each shows as show}
              <li>
                <ShowItem type={type.type} {show} {watchlist} />
              </li>
            {/each}
          {/await}
        </ul>
      </div>
    </div>
  {/each}
</div>