import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

// firebase related
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

export const components = [];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [...components]
  // no provider here
})
export class CoreModule {
  // making sure that core module is imported only once.
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error(
        'CoreModule should only be instantiated ONCE, in AppModule.'
      );
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
