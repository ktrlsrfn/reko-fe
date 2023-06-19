<script lang="ts">
    export let open = false;
    import IcSharpHome from '~icons/ic/sharp-home';
    import MaterialSymbolsSearch from '~icons/material-symbols/search';
    import CarbonForum from '~icons/carbon/forum';
    import MaterialSymbolsBookmarkOutline from '~icons/material-symbols/bookmark-outline';
    import profileImage from '$lib/images/default-user.png';
    import PhSignIn from '~icons/ph/sign-in'

    export let user: any;    

    $: username = user?.user_metadata.name;
    $: avatar = user?.user_metadata.avatar_url;

    const menus = [
        {
            name: 'Home',
            icon: IcSharpHome,
            href: '/'
        },
        {
            name: 'Search',
            icon: MaterialSymbolsSearch,
            href: '/search'
        },
        {
            name: 'Forum',
            icon: CarbonForum,
            href: '/forum'
        },
        {
            name: 'Watchlist',
            icon: MaterialSymbolsBookmarkOutline,
            href: '/watchlist',
            authenticated: true
        },
    ]
</script>

<aside class = "hidden overflow-x-hidden z-5 transition-all min-w-[250px] bg-slate-900" class:open>
    <nav class="flex flex-col gap-6 w-full p-4 text-xl text-white items-center">

        {#if user}
            <div class="profile">
                <img src={avatar ?? profileImage} alt=""/>
            </div>
            <span class="text-center">Welcome, {username}!</span>
            <!-- <button type="button">Edit Profile</button> -->

            <a href='/api/logout' class="flex items-center w-full gap-4 px-4 py-2 rounded-md">
                <PhSignIn />
                <span class="hover:no-underline hover:text">Sign out</span>
            </a>
        {:else}
            <a href='/login' class="flex items-center w-full gap-4 px-4 py-2 rounded-md">
                <PhSignIn />
                <span class="hover:no-underline hover:text">Sign in</span>
            </a>
        {/if}

        <div class="w-full h-[1px] bg-white"></div>

        {#each menus as menu}
            <!-- {#if menu.type === 'split'}
                <div class="w-full h-[1px] bg-white"></div>
            {:else} -->
            {#if !menu.authenticated || user}
                <a href={menu.href} class="flex items-center w-full gap-4 px-4 py-2 rounded-md">
                    <svelte:component this={menu.icon} />
                    <span class="hover:no-underline hover:text">{menu.name}</span>
                </a>
            {/if}

            <!-- {/if} -->
        {/each}
    </nav>
</aside>

<style>	
	.open {
		display: flex;
	}

    a:hover span{
		color: #9e822f;
	}
    
    a:hover {
		text-decoration: none;
		background-color: #1f2937;
	}
    .profile{
        height:150px;
        width:150px;
        justify-content: center;
        align-items: center;
        display:flex;
        flex-direction: Column;
    }

    .profile img{
        height: 100%;
        width: 100%;
        border: 2px solid #9e822f;
        border-radius: 50%;
    }

    button{
        display: inline-block;
        background-color: transparent;
        color: white;
        border: 2px solid #9e822f;
        border-radius: 80px;
        cursor: pointer;
        font-size: 16px;
        padding: 8px 12px;
        width: 75%;
        transition: all 75ms cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    button:hover {
        color: #fff;
        background-color: #9e822f;
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
    }

</style>