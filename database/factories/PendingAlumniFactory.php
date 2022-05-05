<?php

namespace Database\Factories;

use App\Models\PendingAlumni;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PendingAlumni>
 */
class PendingAlumniFactory extends Factory
{
    protected $model = PendingAlumni::class;
    private static $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'student_id' => $this->studentId(),
            'firstname' => $this->faker->firstName(),
            'lastname' => $this->faker->lastName(),
            'email' => $this->faker->email(),
            'password' => $this->faker->password(8),
            'year_graduated' => $this->faker->numberBetween(2000, 2022),
            'course' => $this->faker->randomElement(['bscs', 'bsit', 'bsis', 'bsemc'])
        ];
    }

    private function studentId()
    {
        return function() {
            $batch = rand(2000, 2022);
            $index = Str::padLeft(static::$index++, 4, '0');
            return $batch . $index . '-C';
        };
    }
}
