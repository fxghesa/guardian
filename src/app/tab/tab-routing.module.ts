import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: Tab,
    children: [
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      // },
      // {
      //   path: '',
      //   redirectTo: '/tablinks/profile',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
