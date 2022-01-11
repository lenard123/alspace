<div class="flex flex-col gap-2 p-2">
    <div class="flex">
        <img class="rounded-full mr-2 h-[48px] w-[48px]" src="https://avatars.dicebear.com/api/initials/{{ urlencode($name) }}.svg">
        <div class="flex-grow">
            <div class="bg-gray-100 p-2 rounded-lg">
                <div class="font-bold">{{ $name }}</div>
                <p>{{ $slot }}</p>
            </div>
            <div class="text-sm text-gray-600">2 weeks ago</div>
        </div>
    </div>
</div>