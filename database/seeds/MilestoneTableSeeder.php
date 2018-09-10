<?php

use Illuminate\Database\Seeder;

class MilestoneTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(App\Models\Milestone::class, 5000)->create();
    }
}
