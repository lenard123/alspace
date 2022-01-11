<div class="bg-white border border-gray-200 rounded-lg">
    <div class="flex items-center p-2">
        <img 
            loading="lazy"
            class="rounded-full mr-2 h-[48px] w-[48px]"
            src="https://avatars.dicebear.com/api/initials/{{ urlencode($name)}}.svg"
        >
        <div class="leading-3 flex flex-grow justify-between items-center">
            <div>
                <span class="block font-bold">{{ $name }}</span>
                <span class="block text-sm text-gray-600">2 weeks ago</span>
            </div>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button>
        </div>
    </div>

    <div class="px-2">
        <p>{{ $slot }}</p>
    </div>

    <div class="font-light flex justify-between text-gray-600 text-sm p-2 border-b border-gray-200">
        <div>1 Like</div>
        <div>3 Comments</div>
    </div>
    
    <div class="grid grid-cols-2 font-semibold text-gray-600">
        <button class="bg-white hover:bg-gray-50 py-2 flex items-center justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>Liked</span>    
        </button>

        <a href="{{ url('/post') }}" class="bg-white hover:bg-gray-50 py-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span>Comment</span>
        </a>
    </div>
</div>