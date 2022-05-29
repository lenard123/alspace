<?php


function buildNotificationContent(string $name, string $action, string $content) : string
{
    $name = e($name);
    $action = e($action);
    $content = e(\Str::limit($content, 60));

    return "<strong>$name</strong> $action: \"$content\".";
}