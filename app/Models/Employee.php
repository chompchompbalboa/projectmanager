<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Employee extends Pivot
{
  protected $table = 'employees';
}
