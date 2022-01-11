@props(['title', 'company', 'location', 'image'])
<div class="bg-white border border-gray-200 rounded p-3 pt-6">

    <img class="block h-[90px] w-[90px]" src="{{ $image }}"/>

    <a href="{{ url('/job-details') }}" class="block font-bold text-lg">{{ $title }}</a>
    <div class="text-gray-700 font-light">{{ $company }}</div>
    <div class="text-sm text-gray-500 font-light">{{ $location }}</div>

    <hr class="my-2" />

    <div class="flex justify-between">
        <div class="text-sm text-gray-500">3 days ago</div>
        <div class="text-sm text-gray-500">Posted by: Lenard Mangay-ayam</div>
    </div>

</div>