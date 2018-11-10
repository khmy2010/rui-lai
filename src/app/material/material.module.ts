import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [MatToolbarModule, MatListModule, MatButtonModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
