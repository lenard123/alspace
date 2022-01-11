<x-base-layout>

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">

            <div class="pb-10 py-5">
                <a href="/">
                    <x-application-logo class="mx-auto w-20 h-20 fill-current text-gray-500 rounded" />
                </a>
            </div>

            <form method="GET" action="{{ url('/') }}">

                <div>
                    <label class="block font-medium text-sm text-gray-700">Student No.</label>
                    <input type="text" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>

                <div class="mt-4">
                    <label class="block font-medium text-sm text-gray-700">Password</label>
                    <input type="password" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>

                <div class="block mt-4">
                    <label for="remember_me" class="inline-flex items-center">
                        <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="">
                        {{ __('Forgot your password?') }}
                    </a>

                    <button class="ml-3 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                        Log in
                    </button>
                </div>

            </form>

        </div>

        <div class="mt-2">
            <p class="text-center">
                <span class="block text-gray-600 text-sm">Don't have an Account?</span>
                <span class="block text-gray-600 text-sm">
                    Register
                    <a class="underline hover:text-gray-900" href="">here</a>
                </span>
            </p>
        </div>

    </div>


</x-base-layout>