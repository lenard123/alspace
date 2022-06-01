<?php

namespace App\Http\Controllers;

use App\Models\Alumnus;
use App\Models\PendingAlumni;
use App\Models\TShirtRequest;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $pending_users = PendingAlumni::count();
        $registered_users = Alumnus::count();
        $total_sales = TShirtRequest::calculateTotalSales();
        $pending_requests = TShirtRequest::pending()->count();

        return compact('pending_users', 'registered_users', 'total_sales', 'pending_requests');
    }
}
