<?php

namespace App\Http\Controllers;

use App\Models\SiteVar;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function tos()
    {
        return SiteVar::firstOrCreate(['key' => 'tos']);
    }

    public function updateTos(Request $request)
    {
        $request->validate(['tos' => 'required']);
        return SiteVar::updateOrCreate(['key' => 'tos'], ['value' => $request->tos]);
    }
}
