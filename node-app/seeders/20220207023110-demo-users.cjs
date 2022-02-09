// 'use strict';

const bcrypt = require('bcrypt')

const setUserPassword = async (interface, password) => {
  const hash = await bcrypt.hash(password, 12)


  await interface.bulkUpdate('Users', {
    password: hash
  })
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        phone: '1-477-935-8478 x6430',
        website: 'ola.org',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        phone: '210.067.6132',
        website: 'elvis.io',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        phone: '586.493.6943 x140',
        website: 'jacynthe.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        phone: '(775)976-6794 x41206',
        website: 'conrad.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        phone: '024-648-3804',
        website: 'ambrose.net',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    await setUserPassword(queryInterface, 'password')
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
