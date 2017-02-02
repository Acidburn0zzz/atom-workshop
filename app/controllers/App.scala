package controllers

import config.Config
import models._
import play.api.Logger
import play.api.libs.ws.WSClient
import play.api.mvc.Controller
import cats.syntax.either._
import db.{AtomDataStores, AtomWorkshopDB}
import com.gu.fezziwig.CirceScroogeMacros._
import io.circe._
import io.circe.syntax._
import util.HelperFunctions._

class App(val wsClient: WSClient) extends Controller with PanDomainAuthActions {

  def index = AuthAction { req =>
    Logger.info(s"I am the ${Config.appName}")

    val clientConfig = ClientConfig(
      username = req.user.email
    )

    Ok(views.html.index("AtomMcAtomFace", clientConfig.asJson.noSpaces))
  }

  def getAtom(atomType: String, id: String, version: String) = AuthAction {
    APIResponse {
      for {
        atomType <- validateAtomType(atomType)
        ds <- AtomDataStores.getDataStore(atomType, getVersion(version))
        atom <- AtomWorkshopDB.getAtom(ds, atomType, id)
      } yield atom
    }
  }

  def createAtom(atomType: String) = AuthAction { req =>
    APIResponse{
      for {
        atomType <- validateAtomType(atomType)
        ds <- AtomDataStores.getDataStore(atomType, Preview)
        result <- AtomWorkshopDB.createAtom(ds, atomType, req.user)
      } yield AtomWorkshopAPIResponse("Atom creation successful")
    }
  }

  def updateAtom(atomType: String, id: String) = AuthAction { req =>
    APIResponse {
      for {
        atomType <- validateAtomType(atomType)
        payload <- extractRequestBody(req.body.asText)
        newAtom <- parseAtomJson(payload)
        datastore <- AtomDataStores.getDataStore(atomType, Preview)
        currentAtom <- AtomWorkshopDB.getAtom(datastore, atomType, id)
        result <- AtomWorkshopDB.updateAtom(datastore, atomType, req.user, currentAtom,newAtom)
      } yield AtomWorkshopAPIResponse(s"Update of atom of type $atomType with id $id successful.")
    }
  }

}
