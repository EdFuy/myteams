<?php

namespace App\Http\Controllers\Index;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TasksController extends Controller
{
    //
    public function tasks(){
        return view('index.tasks');
    }
}
