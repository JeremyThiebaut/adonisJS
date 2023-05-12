import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

export default class BlogsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('blog/index', {
      posts,
    })
  }

  public async create({ view }: HttpContextContract) {
    const post = new Post()
    return view.render('blog/create', {
      post,
    })
  }

  public async store({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: "L'article a bien été créé" })
    return response.redirect().toRoute('home')
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return view.render('blog/show', {
      post,
    })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: "L'article a bien été sauvegardé" })
    return response.redirect().toRoute('home')
  }

  public async destroy({ params, session, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    session.flash({ success: "L'article a bien été supprimé" })
    return response.redirect().toRoute('home')
  }

  private async handleRequest(
    params: HttpContextContract['params'],
    request: HttpContextContract['request']
  ) {
    const post = params.id ? await Post.findOrFail(params.id) : new Post()
    const data = await request.validate(UpdatePostValidator)
    post.merge({ ...data, online: data.online || false }).save()
  }
}
