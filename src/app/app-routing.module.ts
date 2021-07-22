import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/login/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'municipality-menu',
    loadChildren: () => import('./pages/municipalities/municipality-menu/municipality-menu.module').then( m => m.MunicipalityMenuPageModule)
  },
   {
     path: 'site',
     loadChildren: () => import('./pages/municipalities/site/site.module').then( m => m.SitePageModule)
  },
  {
    path: 'celebration',
    loadChildren: () => import('./pages/municipalities/celebration/celebration.module').then( m => m.CelebrationPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./pages/municipalities/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'site-menu',
    loadChildren: () => import('./pages/municipalities/site-menu/site-menu.module').then( m => m.SiteMenuPageModule)
  },
  {
    path: 'celebration-menu',
    loadChildren: () => import('./pages/municipalities/celebration-menu/celebration-menu.module').then( m => m.CelebrationMenuPageModule)
  },
  {
    path: 'menu-new',
    loadChildren: () => import('./pages/notices/menu-new/menu-new.module').then( m => m.MenuNewPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'menu-information',
    loadChildren: () => import('./pages/information/menu-information/menu-information.module').then( m => m.MenuInformationPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./components/terms/terms.module').then( m => m.TermsPageModule)
  },  {
    path: 'user-profile',
    loadChildren: () => import('./components/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
