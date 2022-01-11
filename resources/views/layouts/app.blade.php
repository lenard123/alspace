<x-base-layout>
    <div class="min-h-screen bg-gray-100">
        @include('layouts.partials.app.navigations')

        <div class="py-6">
            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 grid grid-cols-10 gap-6 items-start">
                
                @include('layouts.partials.app.about')

                <div class="col-span-10 md:col-span-7 lg:col-span-5">
                    {{ $slot }}
                </div>

                @include('layouts.partials.app.announcements')

            </div>
        </div>
    </div>
</x-base-layout>