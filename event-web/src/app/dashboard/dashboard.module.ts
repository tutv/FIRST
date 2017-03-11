import {NgModule} from "@angular/core";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ReportsComponent} from "./reports/reports.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {FormCampaignComponent} from "./campaign/form-campaign/form-campaign.component";
import {DesignCampaignComponent} from "./campaign/design-campaign/design-campaign.component";
import {SettingCampaignComponent} from "./campaign/setting-campaign/setting-campaign.component";
import {BeforeSignupComponent} from "./campaign/before-signup/before-signup.component";
import {PanelCustomElementComponent} from "./campaign/panel-custom-element/panel-custom-element.component";
import {SizeControlComponent} from "./controls/size-control/size-control.component";
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from "angular2-color-picker";
import {ColorControlComponent} from "./controls/color-control/color-control.component";
import {TextControlComponent} from "./controls/text-control/text-control.component";
import {CommonModule} from "@angular/common";
import {ControlEventService} from "./services/control-event.service";
import {HtmlControlComponent} from "./controls/html-control/html-control.component";
import {TabsModule, ModalModule, DropdownModule, TooltipModule} from "ng2-bootstrap";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {ChooseBusinessComponent} from "./choose-business/choose-business.component";
import {BusinessGuardService} from "./services/business-guard.service";
import {NewCampaignComponent} from "./new-campaign/new-campaign.component";
import {TextEditableComponent} from "./components/text-editable/text-editable.component";
import {TemplatesComponent} from "./templates/templates.component";
import {InputSwitchComponent} from "./input-switch/input-switch.component";
import {ExtraInputDirective} from "./directives/extra-input.directive";
import {TemplateEditorComponent} from "./template-editor/template-editor.component";
import {AfterSignupComponent} from "./campaign/after-signup/after-signup.component";
import {PreviewService} from "./services/preview.service";
import {ImageControlComponent} from "./controls/image-control/image-control.component";
import {ImageUploadModule} from "angular2-image-upload";
import {ResultCampaignComponent} from "./campaign/result-campaign/result-campaign.component";
import {PlansComponent} from "./plans/plans.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {SharedModule} from "../shared/shared.module";
import {NewEmailSyncComponent} from "./campaign/new-email-sync/new-email-sync.component";
import {ListEmailSyncComponent} from "./campaign/list-email-sync/list-email-sync.component";
import {ListTemplatesComponent} from "./list-templates/list-templates.component";
import {EventService} from "./services/event.service";
import {EmailCampaignComponent} from './campaign/email-campaign/email-campaign.component';
import {EmailEditorComponent} from './email-editor/email-editor.component';
import {ListEmailTemplatesComponent} from './list-email-templates/list-email-templates.component';
import {QrCodeComponent} from './qr-code/qr-code.component';
import {QuestionsComponent} from './questions/questions.component';
import {RealtimeQuestionComponent} from './realtime-question/realtime-question.component';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {EditTimelineComponent} from './edit-timeline/edit-timeline.component';
import {NavigationEventComponent} from './navigation-event/navigation-event.component';
import { FeedbackEventComponent } from './feedback-event/feedback-event.component';

@NgModule({
    imports: [
        DashboardRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ColorPickerModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        DropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ImageUploadModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        CampaignsComponent,
        ContactsComponent,
        ReportsComponent,
        CampaignComponent,
        FormCampaignComponent,
        DesignCampaignComponent,
        SettingCampaignComponent,
        BeforeSignupComponent,
        PanelCustomElementComponent,
        SizeControlComponent,
        ColorControlComponent,
        TextControlComponent,
        HtmlControlComponent,
        ChooseBusinessComponent,
        NewCampaignComponent,
        TextEditableComponent,
        TemplatesComponent,
        InputSwitchComponent,
        ExtraInputDirective,
        TemplateEditorComponent,
        AfterSignupComponent,
        ImageControlComponent,
        ResultCampaignComponent,
        PlansComponent,
        CheckoutComponent,
        NewEmailSyncComponent,
        ListEmailSyncComponent,
        ListTemplatesComponent,
        EmailCampaignComponent,
        EmailEditorComponent,
        ListEmailTemplatesComponent,
        QrCodeComponent,
        QuestionsComponent,
        RealtimeQuestionComponent,
        EditTimelineComponent,
        NavigationEventComponent,
        FeedbackEventComponent
    ],
    providers: [
        ControlEventService,
        PreviewService,
        BusinessGuardService,
        EventService
    ]
})
export class DashboardModule {
}
