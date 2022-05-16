<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        return JobPost::all();
    }

    public function create(Request $request)
    {
        $job = new JobPost($request->only('title', 'company', 'description', 'tags'));
        $job->user()->associate(auth()->user());
        $job->save();
        $job->image->upload($request->file('image'), 'jobs');
        return $job;
    }
}
