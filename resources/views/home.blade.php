<x-app-layout>

    <div class="bg-white sm:rounded-lg border border-gray-200">
        <div class="flex p-4 pt-3">
            <img 
                loading="lazy"
                class="rounded-full mr-2 h-[48px] w-[48px]"
                src="https://avatars.dicebear.com/api/initials/lenard.svg"
            >
            <form action="{{ url('/') }}" class="flex-grow flex flex-col gap-2" method="GET">
                @csrf
                <textarea class="min-h-[48px] h-[48px] w-full rounded-lg border-gray-300" placeholder="Write a post here"></textarea>
                <x-button class="ml-auto">Post</x-button>
            </form>
        </div>
    </div>

    <hr class="my-4" />

    <div class="flex flex-col gap-2">
        <x-post name="Ivan Rey Delfin">Hello world!</x-post>
        <x-post name="Richard Veloria">Hello everyone</x-post>
    </div>

</x-app-layout>