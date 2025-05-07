<script lang="ts">
    import Icon from "@iconify/svelte";

    const id = $props.id()

    const pwd_pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}";

    let loggedin = $state(false);
</script>

<section class="flex flex-col gap-5
bg-base-100 rounded-md
place-items-center place-content-center
min-h-50 min-w-md [&_label]:w-full *:focus-within:outline-none p-5">
    <h1 class="self-start text-xl font-bold">Join us to <Icon icon="noto:rocket" class="inline"/> your experience</h1>
    <label for="{id}-uname" class="input validator floating-label">
        <span>Email</span>
        <Icon icon="ic:outline-email" class="inline"/>
        <input id="{id}-uname" class="outline-0" type="email" placeholder="youremail@gmail.com" required>
    </label>
    <div class="validator-hint hidden my-1">Enter valid email address</div>
    <label for="{id}-pwd" class="input validator floating-label">
        <span>Password</span>
        <Icon icon="fluent:key-20-regular" class="inline"/>
        <input id="{id}-pwd" type="password"
            minlength="8" pattern="{pwd_pattern}"
            placeholder="********" required>
    </label>
    <ul class="validator-hint hidden list-disc my-1">
        <li>Must more than 8 characters</li>
        <li>At least one number</li>
        <li>At least one lowercase letter</li>
        <li>At least one uppercase letter</li>
    </ul>
    <button class="btn btn-primary w-full">
        <span class="loading loading-spinner"></span>
        Login
    </button>
    <div class="divider text-xs">Social</div>
    <button class="btn bg-white text-black border-[#e5e5e5] w-full">
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        Login with Google
    </button>
    <button class="btn bg-[#1A77F2] text-white border-[#005fd8] w-full">
        <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
        Login with Facebook
    </button>
</section>
