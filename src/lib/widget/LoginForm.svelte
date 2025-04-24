<script lang="ts">
    import Icon from "@iconify/svelte";

    const id = $props.id()

    const pwd_pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
</script>

<section class="flex flex-col gap-5
bg-base-100 rounded-md
place-items-center place-content-center
min-h-50 min-w-md [&_label]:w-full *:focus-within:outline-none p-5">
    <h1 class="self-start text-xl font-bold">Join for more contents</h1>
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
    <button class="btn btn-primary self-end w-fit">Login</button>
</section>