import {Router, Request, Response} from "express";
import {Sender, Template} from "../db/model";
import {sendMail} from "./mail/core";
import {DEFAULT_SENDER} from "./config";

const router = Router();

interface SendRequest {
  variables: Record<string, string>
  to: string
  templateName: string
  title: string
  senderEmail: string
  context: Record<string, any>
}

router.post('/send', async (req: Request, res: Response) => {
  const {
    variables,
    to,
    templateName,
    title,
    senderEmail
  } = req.body as SendRequest
  try {
    console.log(senderEmail)
    const email = senderEmail || DEFAULT_SENDER
    const template = await Template.findOne({where: {name: templateName}})
    if (!template) {
      return res.status(404).json({ error: {message: "Not found template"} });
    }
    const sender = await Sender.findOne({where: {email: email}}) as Sender
    if (!sender) {
      return res.status(404).json({ error: {message: `Not found sender with email ${email}`} });
    }
    const html = eval(template.script)(variables)
    await sendMail({
      to,
      title,
      html,
      sender
    })
    res.status(200).send("OK")
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
})

interface ModelRequest {
  name: string
  script: string
}

interface SenderRequest {
  email: string
  password: string
  smtp_host: string
}

router.post('/set_template', async (req: Request, res: Response) => {
  const {
    name,
    script,
  } = req.body as ModelRequest
  try {
    let template = await Template.findOne({where: {name}})
    if (template) {
      template.script = script
      await template.save();
    } else {
      await Template.create({name, script})
    }
    res.status(200).send("setted")
  } catch (e) {
    res.status(500).json({ error: e });
  }
})
router.get('/template', async (req: Request, res: Response) => {
  try {
    res.status(200).send((await Template.findAll()).map(({name}) => ({
      name
    })))
  } catch (e) {
    res.status(500).json({ error: e });
  }
})

router.get('/template/:name', async (req: Request, res: Response) => {
  const {name} = req.params
  try {
    const template = await Template.findOne({where: {name}})
    if (!template) {
      throw new Error("Not found")
    }
    const text = eval(template.script)()
    res.status(200).send(text)
  } catch (e) {
    res.status(500).json({ error: e });
  }
})
router.delete('/template/:name', async (req: Request, res: Response) => {
  const {name} = req.params
  try {
    const template = await Template.findOne({where: {name}})
    if (template) {
      await template.destroy()
      res.status(200).send()
    } else {
      res.status(404).json({ error: {message: "Not Found"} });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
})

router.post('/set_sender', async (req: Request, res: Response) => {
  const sender = req.body as SenderRequest
  try {
    await Sender.create({...sender})
    res.status(200).send(`created ${sender.email}`)
  } catch (e) {
    res.status(500).json({ error: e });
  }
})

export default router
