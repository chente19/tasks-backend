{"_type":"export","__export_format":4,"__export_date":"2021-07-11T18:35:38.103Z","__export_source":"insomnia.desktop.app:v2021.3.0","resources":[{"_id":"req_be1fda1c2c874e0888bf263163aaf66e","parentId":"fld_29f795dca0734048ae8e29ad0f900d63","modified":1626028468857,"created":1625976731967,"url":"http://localhost:4000/test/task/update/1","name":"update_one_task","description":"","method":"PUT","body":{"mimeType":"application/json","text":"{\n\t\"title\": \"Update title\",\n\t\"content\": \"Updated content\",\n\t\"responsable_user\": 1000\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json","id":"pair_7970e8d7e9e74a54bdb542cba642c66a"}],"authentication":{},"metaSortKey":-1609638284244.5,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"fld_29f795dca0734048ae8e29ad0f900d63","parentId":"fld_745a33d6fcb84e63821705b771053d66","modified":1625975886962,"created":1625975886962,"name":"tasks","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1625975886962,"_type":"request_group"},{"_id":"fld_745a33d6fcb84e63821705b771053d66","parentId":"wrk_2ff4fc71e45d4d8199d770273cfbe21e","modified":1625957944960,"created":1625957944960,"name":"taks_endpoints","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1625957944960,"_type":"request_group"},{"_id":"wrk_2ff4fc71e45d4d8199d770273cfbe21e","parentId":null,"modified":1598488381363,"created":1598488381363,"name":"Insomnia","description":"","scope":"collection","_type":"workspace"},{"_id":"req_3ad014cb9bee4c02956b8cc7a6ea60d1","parentId":"fld_29f795dca0734048ae8e29ad0f900d63","modified":1626022019344,"created":1626021900899,"url":"http://localhost:4000/test/task/deactivate/1","name":"deactivate_one_task","description":"","method":"PUT","body":{"mimeType":"application/json","text":"{\n\t\"responsable_user\": 1000,\n\t\"task_status\": false\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json","id":"pair_7970e8d7e9e74a54bdb542cba642c66a"}],"authentication":{},"metaSortKey":-1609638284238.25,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_367cbc4010774145bb87f4158393bfef","parentId":"fld_29f795dca0734048ae8e29ad0f900d63","modified":1625976287377,"created":1625975902535,"url":"http://localhost:4000/test/task/add","name":"create_one_task","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n\t\"title\": \"A title taks\",\n\t\"content\": \"Some content for this task\",\n\t\"responsable_user\": 1000\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json","id":"pair_a8ad10a7976d4f40a8322b2ae62fae02"}],"authentication":{},"metaSortKey":-1609638284194.5,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_89e033b503b245a6ace064cb99a55b3e","parentId":"fld_be0f48cda3464390830ba88420a9066e","modified":1625975915897,"created":1625957994847,"url":"http://localhost:4000/test/user/add","name":"create_one_admin","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n\t\"user_name\": \"Admin Tasks\",\n\t\"user_first_lastname\": \"lastname1\",\n\t\"user_second_lastname\": \"lastname2\",\n\t\"user_password\": \"123456\",\n\t\"user_role\": \"admin\",\n\t\"user_created_by\": \"1000\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json","id":"pair_a8ad10a7976d4f40a8322b2ae62fae02"}],"authentication":{},"metaSortKey":-1609638284207,"isPrivate":false,"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"fld_be0f48cda3464390830ba88420a9066e","parentId":"fld_745a33d6fcb84e63821705b771053d66","modified":1625975873226,"created":1625957994835,"name":"users","description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1613370976184,"_type":"request_group"},{"_id":"env_084a280dcdae1bbf2c4a03bd3e0e8a403431e734","parentId":"wrk_2ff4fc71e45d4d8199d770273cfbe21e","modified":1598488381428,"created":1598488381428,"name":"Base Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1598488381429,"_type":"environment"},{"_id":"jar_084a280dcdae1bbf2c4a03bd3e0e8a403431e734","parentId":"wrk_2ff4fc71e45d4d8199d770273cfbe21e","modified":1608334105091,"created":1598488381431,"name":"Default Jar","cookies":[{"key":"__cfduid","value":"d7efb521b72b076557ae5c16f27c1eaac1608334105","expires":"2021-01-17T23:28:25.000Z","domain":"reqres.in","path":"/","secure":true,"httpOnly":true,"extensions":["SameSite=Lax"],"hostOnly":false,"creation":"2020-09-15T03:40:45.454Z","lastAccessed":"2020-12-18T23:28:25.090Z","id":"5469364118834967"}],"_type":"cookie_jar"},{"_id":"spc_48e46e9d51884e268b8994dbaf4b7f7a","parentId":"wrk_2ff4fc71e45d4d8199d770273cfbe21e","modified":1598488381366,"created":1598488381366,"fileName":"Insomnia","contents":"","contentType":"yaml","_type":"api_spec"}]}