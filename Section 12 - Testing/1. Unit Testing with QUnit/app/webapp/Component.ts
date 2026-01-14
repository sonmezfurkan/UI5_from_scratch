/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
import UIComponent from "sap/ui/core/UIComponent"
import MessageBox from "sap/m/MessageBox"
import Filter from "sap/ui/model/Filter"
import FilterOperator from "sap/ui/model/FilterOperator"
import Messaging from "sap/ui/core/Messaging"
import Message from "sap/ui/core/message/Message"
import ListBinding from "sap/ui/model/ListBinding"
import { Binding$ChangeEvent } from "sap/ui/model/Binding"
import models from "ui5/trippin/model/models"

/**
 * @namespace ui5.trippin
 */
export default class Component extends UIComponent {
  public static metadata = {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json",
  }

  public bError = false

  init(): void {
    // call super
    super.init()

    // enable routing
    this.getRouter().initialize()

    // set the device model
    this.setModel(models.createDeviceModel(), "device")

    // error handling
    const oMessageModel = Messaging.getMessageModel(),
      oMessageModelBinding = oMessageModel.bindList(
        "/",
        undefined,
        [],
        new Filter("technical", FilterOperator.EQ, true)
      )

    oMessageModelBinding.attachChange(this.onMessageBindingChange, this)
  }

  private onMessageBindingChange(oEvent: Binding$ChangeEvent) {
    const aContexts = (oEvent.getSource() as ListBinding).getContexts()
    let aMessages: Array<Message> = []
    let bMessageOpen = false

    this.bError = false

    if (bMessageOpen || !aContexts.length) {
      return
    }

    // Extract and remove the technical messages
    //aMessages = aContexts.map((oContext: Context) => oContext.getObject())
    aMessages = aContexts.map(oContext => oContext.getObject() as Message)

    Messaging.removeMessages(aMessages)

    if (aMessages.length) this.bError = true

    MessageBox.error(aMessages[0].getMessage(), {
      onClose: () => {
        bMessageOpen = false
        Messaging.removeAllMessages()
        this.bError = false
      },
    })

    bMessageOpen = true
  }
}
