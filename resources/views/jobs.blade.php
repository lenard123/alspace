<x-app-layout>

    <div class="flex flex-col gap-2">

        <x-job-card 
            title="Marketing Officer"
            company="Organica Nutraceuticals Inc."
            location="Quezon City, National Capital Region, Philippines"
            :image="asset('images/company1.jpg')"
        />

        <x-job-card 
            title="Medical Sales Representative"
            company="Spectrum Innovations Inc."
            location="Makati, National Capital Region, Philippines"
            :image="asset('images/company2.jpg')"
        />

        <x-job-card 
            title="Lead Backend Developer"
            company="Mpowered Health"
            location="National Capital Region, Philippines"
            :image="asset('images/company3.jpg')"
        />

    </div>

</x-app-layout>