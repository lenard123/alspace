<?php

namespace Database\Factories;

use App\Models\JobPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobPost>
 */
class JobPostFactory extends Factory
{

    protected $model = JobPost::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'description' => $this->faker->text(100),
            'tags' => $this->tags()

        ];
    }

    private function tags()
    {
        $type = collect(['Remote', 'On Site']);
        $time = collect(['Full time', 'Part time']);

        return fn() => collect([
            $type->random(),
            $time->random()
        ])->toJson();

    }
}
