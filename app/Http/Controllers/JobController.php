<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostJobRequest;
use App\Models\JobPost;

class JobController extends Controller
{
    public function index()
    {
        return JobPost::all();
    }

    public function create(PostJobRequest $request)
    {
        $job = new JobPost($request->validated());
        $job->user()->associate(auth()->user());
        $job->save();
        $job->image->upload($request->file('image'), 'jobs');
        return $job;
    }
}
