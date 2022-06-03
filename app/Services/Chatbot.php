<?php

namespace App\Services;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Question;
use App\Models\User;

class Chatbot
{
    public function handle(Message $message)
    {
        $this->thread = $message->thread;
        $this->user = $message->user;

        if ($message->content === 'hello') {
            $this->reply('hi');
            return;
        }

        if ($message->content === 'help') {
            $this->replyHelp();
            return;
        }

        for($i = 1; $i <= Question::count(); $i++)
        {
            if ($message->content === "help [$i]") {
                $this->reply(Question::query()->pluck('answer')->get($i - 1));
            }
        }
    }

    private function replyHelp()
    {
        $message = "Hello {$this->user->firstname}\n";
        $message .= "Select from the list below your problem\n";
        $questions = Question::query()->pluck('question');
        $i = 1;
        foreach($questions as $question) {
            $message .= "[{$i}] {$question} \n";
            $i++;
        } 
        $message .= "Reply \"help [n]\"";
        $this->reply($message);
    }

    private function reply($message)
    {
        $bot = $this->getBotUser();
        $bot->sendMessageOn($this->thread, $message);
    }

    private function getBotUser()
    {
        return User::admin()->where('role', 'super')->first();
    }
}