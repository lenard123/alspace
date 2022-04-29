@component('mail::message')
# Verify Your Email

Below is your One Time Passcode:

<h1 style='text-align:center'>{{ $code }}</h1>

This OTP will expire in 10 minutes.

If you did not register to our site, no further action is required.

Regards,<br>
{{ config('app.name') }}

@endcomponent
