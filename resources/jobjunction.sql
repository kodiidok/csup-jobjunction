INSERT INTO
  public.company (username, email, password, name, "roleId", id)
VALUES
  (
    'hemas',
    'hemas@email.com',
    'hemas',
    'Hemas',
    NULL,
    'aaff3d5c-6c1e-457c-9aa8-a214d286ae3f'
  ),
  (
    'cbl',
    'cbl@email.com',
    'cbl',
    'cbl',
    NULL,
    '96a62327-4cbb-4fd3-914b-8ebd57b93680'
  ),
  (
    'aayu',
    'aayu@email.com',
    'aayu',
    'aayu',
    NULL,
    '5bbed243-e669-44b6-8c69-0df1e34da209'
  ),
  (
    'simcentric',
    'simcentric@email.com',
    'simcentric',
    'simcentric',
    NULL,
    '46dcbe92-265b-4386-9af5-f6d40707b993'
  );

INSERT INTO
  public.interview (
    "interviewDate",
    "interviewTime",
    status,
    id,
    "roomId"
  )
VALUES
  (
    NULL,
    NULL,
    NULL,
    '060f7e02-b4a1-449b-a08c-fdcc3e597c8f',
    'ff56d429-c717-4c3b-bcd8-938dc6f89d65'
  ),
  (
    NULL,
    NULL,
    NULL,
    '56c5f372-a2e3-43b4-b933-2aa0e9a7d96a',
    'b93d95a9-8d67-4192-9eae-7903deca80c8'
  ),
  (
    NULL,
    NULL,
    NULL,
    '0ac3858e-6b39-44eb-a06c-bbd23c28568b',
    '861c9eb5-7435-4b55-8463-6b7c10a53d9d'
  );

INSERT INTO
  public.room (
    "roomNumber",
    "roomStatus",
    "currentStudent",
    id,
    "stallId",
    "interviewIds",
    "completedInterviewIds"
  )
VALUES
  (
    12,
    'vacant',
    NULL,
    '90eca163-dde5-4bbd-b323-73520aac9e75',
    '3469effd-1772-4000-996b-db6fea0b206a',
    NULL,
    NULL
  ),
  (
    9,
    'occupied',
    NULL,
    'c808d2f0-e758-4a6e-a6a9-8423db445530',
    'ddb7bd48-9d22-478d-883f-923eec13d210',
    NULL,
    NULL
  ),
  (
    1,
    'occupied',
    NULL,
    '861c9eb5-7435-4b55-8463-6b7c10a53d9d',
    'e0829c25-8f6d-471f-a626-875c18f76613',
    'a822b287-72c9-4d73-81c4-2c03fa241524,0ac3858e-6b39-44eb-a06c-bbd23c28568b',
    NULL
  ),
  (
    2,
    'occupied',
    NULL,
    'ff56d429-c717-4c3b-bcd8-938dc6f89d65',
    '2b0f0c32-9066-4a8f-80ec-d3e9a286c37a',
    '060f7e02-b4a1-449b-a08c-fdcc3e597c8f',
    NULL
  );

INSERT INTO
  public.stall (
    "stallNumber",
    "floorPlanLocation",
    id,
    "companyId"
  )
VALUES
  (
    1,
    'GF-B3',
    '2b0f0c32-9066-4a8f-80ec-d3e9a286c37a',
    'aaff3d5c-6c1e-457c-9aa8-a214d286ae3f'
  ),
  (
    2,
    'GF-B1',
    '981eae02-8b47-496b-94a5-49e20d148039',
    'aaff3d5c-6c1e-457c-9aa8-a214d286ae3f'
  );

INSERT INTO
  public.student (
    username,
    email,
    password,
    name,
    "roleId",
    id,
    "studentId"
  )
VALUES
  (
    's18001',
    's18001@sci.pdn.ac.lk',
    's18001',
    's18001',
    NULL,
    'ad67d5f9-84fa-4134-a0fa-cb9e93198d72',
    's18001'
  ),
  (
    's18002',
    's18002@sci.pdn.ac.lk',
    's18002',
    's18002',
    NULL,
    'c42cb1e6-f869-4a62-97a3-0205c9711091',
    's18002'
  );

INSERT INTO
  public.student_interviews ("interviewId", "studentId")
VALUES
  (
    '060f7e02-b4a1-449b-a08c-fdcc3e597c8f',
    'ad67d5f9-84fa-4134-a0fa-cb9e93198d72'
  ),
  (
    '56c5f372-a2e3-43b4-b933-2aa0e9a7d96a',
    'ad67d5f9-84fa-4134-a0fa-cb9e93198d72'
  );

INSERT INTO
  public.user (username, email, password, name, "roleId", id)
VALUES
  (
    'superadmin',
    'superadmin',
    'superadmin',
    'Super Admin',
    NULL,
    '1626d6d0-41dc-4209-9343-cbac8108cc69'
  );