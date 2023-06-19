<script>
import logo from '$lib/images/reko-logo.png';
import backgroundImage from '$lib/images/bg.jpg';
import GoogleIcon from '~icons/logos/google-icon';
</script>

<div class="flex w-full flex-grow justify-center items-center" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{backgroundImage}'); background-size: cover; background-repeat: no-repeat;">
    <div class="flex flex-col gap-4 items-center">
        <img src={logo} alt="" class="w-96">
        <div class="w-full h-[1px] bg-white/75"></div>
        <form action="/api/login" method="GET" class="flex w-full justify-center mt-4">
            <button class="flex gap-4 items-center justify-center border-none w-full py-2 bg-white rounded-3xl">
                <GoogleIcon />
                <span class="font-semibold text-black">Log in with Google</span>
            </button>
        </form>
    </div>
</div>