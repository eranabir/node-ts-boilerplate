import {ApiController, IControllerMethod} from "@controllers";
import {verifyLoginTokenOnRequest} from "@middlewares";
import {unionBy} from 'lodash'

type TModel = 'userModel' | 'patientModel' | 'clinicModel' | 'eventModel' |
    'patientTypeModel' | 'paymentModel' | 'productModel' | 'customerModel' | 'treatmentModel'

export class EntityController extends ApiController {
    constructor(model: TModel, methods: IControllerMethod[] = []) {
        const _controllerMethods: IControllerMethod[] = [
            {
                type: 'getAll',
                method: 'GET',
                path: '/',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    console.log('on GET many entity controller')
                    const {filter, skip, limit, sort, select, populate} = req.mongooseQuery.query
                    const data = await req[this.model].find(filter).skip(skip).limit(limit).sort(sort).select(select).populate(populate).exec()
                    return res.json(data)
                }
            },
            {
                type: 'getOne',
                method: 'GET',
                path: '/:id',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    console.log('on GET one entity controller')
                    const {skip, limit, sort, select, populate} = req.mongooseQuery.query
                    const {id} = req.params
                    const data = await req[this.model].findById(id).skip(skip).limit(limit).sort(sort).select(select).populate(populate).exec()
                    return res.json(data)
                }
            },
            {
                type: 'postOne',
                method: 'POST',
                path: '/',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    const {populate} = req.mongooseQuery.query
                    console.log('on POST one entity controller')
                    const requestData = req.body
                    const data = new req[this.model](requestData)
                    let newData = await data.save()
                    if (populate) {
                        newData = await data.populate(populate).execPopulate()
                    }
                    return res.json(newData)
                }
            },
            {
                type: 'putOne',
                method: 'PUT',
                path: '/:id',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    const {populate} = req.mongooseQuery.query
                    console.log('on PUT one entity controller')
                    const reqData = req.body
                    const {id} = req.params
                    let data = await req[this.model].findByIdAndUpdate(id, {$set: reqData}, {new: true})
                    if (populate) {
                        data = await data.populate(populate).execPopulate()
                    }
                    return res.json(data)
                }
            },
            {
                type: 'patchOne',
                method: 'PATCH',
                path: '/:id',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    const {populate} = req.mongooseQuery.query
                    console.log('on PUT one entity controller')
                    const reqData = req.body
                    const {id} = req.params
                    let data = await req[this.model].findByIdAndUpdate(id, reqData)
                    if (populate) {
                        data = await data.populate(populate).execPopulate()
                    }
                    return res.json(res)
                }
            },
            {
                type: 'deleteOne',
                method: 'DELETE',
                path: '/:id',
                middlewares: [verifyLoginTokenOnRequest],
                action: async (req, res) => {
                    console.log('on DEL one entity controller')
                    const {id} = req.params
                    const data = await req[this.model].findByIdAndDelete(id)
                    return res.json(data);
                }
            }
        ]
        const controllerMethods = unionBy([...methods, ..._controllerMethods], (item) => item.type)
        super(model, controllerMethods)
    }
}
