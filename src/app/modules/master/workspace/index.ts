import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared-module';
import { AuthGuard } from '../../../services/authguard-service';

import { AddWorkspaceComponent } from './aded/addws.comp';
import { ViewWorkspaceComponent } from './view/viewws.comp';

import { WorkspaceService } from '../../../../services/workspace/ws-service';
import { CommonService } from '../../../../services/common/common-service';

export const routes = [
  {
    path: '', children: [
      {
        path: '', component: ViewWorkspaceComponent, canActivate: [AuthGuard],
        data: { "module": "mst", "submodule": "ws", "rights": "view", "urlname": "/workspace" }
      },
      {
        path: 'profile', component: ViewWorkspaceComponent, canActivate: [AuthGuard],
        data: { "module": "mst", "submodule": "ws", "rights": "view", "urlname": "/workspace" }
      },
      {
        path: 'add', component: AddWorkspaceComponent, canActivate: [AuthGuard],
        data: { "module": "mst", "submodule": "ws", "rights": "add", "urlname": "/add" }
      },
      {
        path: 'details/:id', component: AddWorkspaceComponent, canActivate: [AuthGuard],
        data: { "module": "mst", "submodule": "ws", "rights": "edit", "urlname": "/edit" }
      },
      {
        path: 'edit/:id', component: AddWorkspaceComponent, canActivate: [AuthGuard],
        data: { "module": "mst", "submodule": "ws", "rights": "edit", "urlname": "/edit" }
      }
    ]
  },
];


@NgModule({
  declarations: [
    AddWorkspaceComponent,
    ViewWorkspaceComponent
  ],

  imports: [
    CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)
  ],

  providers: [AuthGuard, CommonService, WorkspaceService]
})

export class WorkspaceModule {
  public static routes = routes;
}
