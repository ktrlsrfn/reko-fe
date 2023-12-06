<script>
  import logo from '$lib/images/reko-logo.png';
  import backgroundImage from '$lib/images/bg.jpg';

  export let form;
  </script>

  <div class="flex w-full flex-grow justify-center items-center" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{backgroundImage}'); background-size: cover; background-repeat: no-repeat;">
    {#if form?.error}
    <div class="w-full py-4 px-4 bg-red-500/80 rounded-md text-white font-bold">
      <span>{form.error}</span>
    </div>
    {/if}

    {#if form && !form.error}
      <div class="w-full py-4 px-4 bg-green-500/80 rounded-md text-white font-bold">
        <span>Successfully created account</span>
      </div>
    {/if}

    <div class="flex flex-col gap-4 items-center">
        <img src={logo} alt="" class="w-96">
        <div class="w-full h-[1px] bg-white/75"></div>
        <form action="?/register" method="POST" class="flex flex-col w-full mt-4 gap-4">
          <div>
            <label for="username-input">Username:</label>
            <input id="username-input" name="username" type="text" class="input h-10 px-4">
          </div>
          <div>
            <label for="email-input">Email:</label>
            <input id="email-input" name="email" type="email" class="input h-10 px-4">
          </div>
          <div>
            <label for="email_input">Password:</label>
            <input id="email-input" name="password" type="password" class="input h-10 px-4">
          </div>
          <div>
            <label for="password_input">Confirm Password:</label>
            <input id="confirm-password-input" name="confirm-password" type="password" class="input h-10 px-4">
          </div>

          <button type="submit" class="btn variant-filled">Create account</button>
        </form>
    </div>
  </div>