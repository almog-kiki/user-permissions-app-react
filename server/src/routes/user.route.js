const router = mainModule.express.Router();
const user_controller = require('../controllers/user.controller');

router.get('/roles', user_controller.getRoles);
router.get('/:id',      user_controller.get);
router.get('/',        user_controller.getAll);
router.post('/',       user_controller.create);
router.put('/',        user_controller.update);
router.post('/deleteAll',  user_controller.deleteAll);
router.post('/deleteSelectedUsers',  user_controller.deleteUsers);

module.exports = router;