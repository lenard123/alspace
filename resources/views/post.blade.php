<x-app-layout>
    <x-post name="Lenard Mangay-ayam">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </x-post>
    

    <div class="bg-white border border-t-0 border-gray-200 pt-2">

        <x-comment name="Richard Veloria">
            Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
        </x-comment>

        <hr class="mb-2"/>

        <div class="p-2">
          <div class="flex">
              <img 
                  loading="lazy"
                  class="rounded-full mr-2 h-[48px] w-[48px]"
                  src="https://avatars.dicebear.com/api/initials/lenard.svg"
              >
              <form action="{{ url('/post') }}" class="flex-grow flex flex-col gap-2" method="GET">
                  <textarea class="min-h-[48px] h-[48px] w-full rounded-lg border-gray-300" placeholder="Write your comment here"></textarea>
                  <x-button class="ml-auto">Submit</x-button>
              </form>
          </div>
        </div>

    </div>

</x-app-layout>