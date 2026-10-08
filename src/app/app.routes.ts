import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from '../features/members/member-list/member-list.component';
import { MemberDetailComponent } from '../features/members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from 'src/features/test.errors/test.errors.component';
import { NotFoundComponent } from 'src/shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from 'src/shared/errors/server-error/server-error.component';
import { MemberProfileComponent } from 'src/features/members/member-profile/member-profile.component';
import { MemberPhotosComponent } from 'src/features/members/member-photos/member-photos.component';
import { memberResolver } from 'src/features/members/member.resolver';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {
        path: 'members/:id', 
        resolve: {member: memberResolver},
        component: MemberDetailComponent,
        children: [
          {path: '', redirectTo: 'profile', pathMatch: 'full'},
          {path: 'profile', component: MemberProfileComponent, title: 'Profile'},
          {path: 'photos', component: MemberPhotosComponent, title: 'Photos'}, 
          {path: 'messages', component: MessagesComponent, title: 'Messages'},
        ]
      },
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component:  NotFoundComponent}
];



