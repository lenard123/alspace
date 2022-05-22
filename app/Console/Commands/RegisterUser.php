<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class RegisterUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Register a new user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Register a new user");

        try {
            $user = new User();
            $user->email = $this->ask("Email");
            $user->firstname = $this->ask("Firstname");
            $user->lastname = $this->ask("Lastname");
            $user->password = $this->secret("Password");
            $user->save();
            $this->info("Registered Successfully");
        } catch (\Exception $ex) {
            $this->error("Failed to register user");
            $this->error($ex->getMessage());
        }

        return 0;
    }
}
