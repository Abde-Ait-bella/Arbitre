@component('mail::message')

<h1>
    <a href="arbitre.ma">
        arbitre.ma
    </a>
</h1>

<x-mail::panel>
 .إضغط على الزر أسفله لتعيين كلمة سر من جديد
</x-mail::panel>

<x-mail::button :url="'http://localhost:3000/password-reset/'.$token.'/'.$email" color="success">
إضغط هنا
</x-mail::button>

. شكرا <br>
<p>
    {{ config('app.name') }}
</p>
@endcomponent
