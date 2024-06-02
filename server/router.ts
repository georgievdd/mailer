import {Router, Request, Response} from "express";
import {Template} from "../db/model";
import {sendMail} from "../mail/core";

const router = Router();

interface SendRequest {
  variables: string // объект с необходимыми переменными; достается через eval
  to: string
  templateName: string
  title: string
}

router.post('/send', async (req: Request, res: Response) => {
  const {
    variables,
    to,
    templateName,
    title,
  } = req.body as SendRequest
  try {
    const template = await Template.findOne({where: {name: templateName}})
    if (!template) {
      return res.status(500).json({ error: {message: "Not found template"} });
    }
    // combine variables and temp.script
    const html = eval(template.script)
    sendMail({
      to,
      title,
      html,
    })
    res.status(200).send("OK")
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e });
  }
})

interface ModelRequest {
  name: string
  script: string
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
    res.status(200).send((await Template.findAll()).map(({name, script}) => ({
      name, script
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
    const text = eval(template.script)
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

export default router