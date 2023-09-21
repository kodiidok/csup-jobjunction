--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    "stallIds" text
);


ALTER TABLE public.company OWNER TO postgres;

--
-- Name: interview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "interviewDate" timestamp without time zone,
    "interviewTime" character varying,
    status character varying,
    "roomId" uuid
);


ALTER TABLE public.interview OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "roomNumber" character varying,
    "roomStatus" character varying,
    "interviewIds" text,
    "completedInterviewIds" text,
    "stallId" uuid,
    "roomName" character varying,
    floor character varying
);


ALTER TABLE public.room OWNER TO postgres;

--
-- Name: stall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stall (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "companyId" uuid,
    "roomId" uuid
);


ALTER TABLE public.stall OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    "studentId" character varying NOT NULL,
    "interviewIds" text
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_interviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_interviews (
    "interviewId" uuid NOT NULL,
    "studentId" uuid NOT NULL
);


ALTER TABLE public.student_interviews OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, username, email, password, name, "roleId", "stallIds") FROM stdin;
09e06519-7bf3-483e-953a-c0f94872f91c	eyepax	eyepax@gmail.com	$2b$10$2CvcrNfTg2frTMXQPdkF5.vqCQS6hy/e3SxBFuImazJnv1lLQNr8i	Eyepax IT	\N	{446694b9-f88a-465d-add6-98d85a678c90}
de26907a-c67b-4938-8c61-fecd7c2c0a5c	sumathi	sumathi@gmail.com	$2b$10$JGBoNggZCCVF0pKykEKzlOL.W0/jMf37/Yr5M1pnYFunbPGf119JW	Sumathi IT Holdings(mainframe)	\N	{fab8d00e-6178-4c2e-9c92-5e1f8a559371}
eacf1d8e-d986-4ab9-a78e-2f61e616f51a	simcentrics	simcentrics@gmail.com	$2b$10$9cvtthartb9.sa9txhSxue8HYaGCL.cjNklkqqrgWSGddK6srLena	SimCentrics Tectnologies	\N	{16454435-2e61-4458-bcd6-620e26b2845b}
061b77c6-c634-4fcd-9067-647e06ff23e4	codegen	codegen@gmail.com	$2b$10$/D71HUfvcVYWL1/raDt75uQAGZbdt4EehYe5CvMNmggUbmy3rVAbi	Codegen IT	\N	{c0cc8b46-1d88-401e-ac9e-a21ffc390e20}
44d42606-1e8b-4744-b6fb-02337aa60a8d	cbl	cbl@gmail.com	$2b$10$.fLWNhmJJsPOE04tyPJwMO9Hdo.rUFRbmTT1P4uRFn9WZN66WBhIK	CBL	\N	{8377d01f-a602-4acf-844b-19c6a2c37179}
3ba4c8ac-9038-4271-bb07-2f43d819a4b5	lankem	lankem@gmail.com	$2b$10$Cc3CsDHqxuUa4nCa33XhA.QGeow3KodyAUxgcGABzHBgv1hSLamjy	Lankem	\N	{b07f8cd3-0b91-4aeb-b344-9cde732f23e7}
74c3b6b1-c5e8-42f7-b9c3-c1c9a61d34e8	unilever	unilever@gmail.com	$2b$10$m.odIn5/cKeWsz.SrinwLuhhPdlismf5502ncCZV1.v12EYpiYWDe	Unilever Sri Lanka	\N	{53df409d-71ca-4640-9199-3cc8583d13cf}
06994777-7dec-4aa9-a329-96bbf958df37	kelun	kelun@gmail.com	$2b$10$zXe2eCMv4vUHzBLVgKkAFuFqGaTpL1z5XeYEueGOm5NOrXNK3t47C	Kelun Lifesciences	\N	{5c9065ac-c8b0-4159-a879-fd08c6b02dc9}
2fbd035b-c10d-4b1b-8064-ba117300543a	haycarb	haycarb@gmail.com	$2b$10$VH5zGhC2pqUikvhj/XrzouZHixHYVlyeFTIukQK4IX.wsMS3rpYD2	Haycarb	\N	{ad3e8946-3c87-4788-bd0d-53d716ca8bf7,5dbdabae-9d9b-4f30-9c8e-1ea8a959e728,6e966234-67b8-4fee-b294-f9cf92286e95}
18f8b18c-e13e-41fb-a3d0-ea0d6f034388	h1dialog	h1dialog@gmail.com	$2b$10$9SuMweNXqcpflMjxgsdgC.he15IwFZT.U1tqu5WFkWN0vmQpe8xaO	H 1 Dialog	\N	{8519fb73-35bd-4579-b075-4c6cf3579a35}
97971fab-6a64-4c6f-a28f-0397c1f61b80	hemas	hemas@gmail.com	$2b$10$moHYarfnK4p.58WEgipec.cu3ZxEvIYJs6dQlpFoKhcdHHXTE1pNS	Hemas consumer brands	\N	{9b6ae7ae-8551-464a-b923-4cf40d3487e0}
794bb94a-2a94-4e85-8dfc-4875fa5b4f70	octave	octave@gmail.com	$2b$10$fZalCN1fDPookRqBrbiCa.NU.WjITVzJVDNLGHagheTRkHI4KolA.	Octave-John keels Holdings	\N	{67c35d5b-f1aa-4593-9242-6cc3c04d5a0a}
3a81b156-9282-4d92-b826-998bcbe2f8c5	mas	mas@gmail.com	$2b$10$9Fh3a2CQtcisjFD49soUrOuu5TynNYGjfGd0tB.7Uer5jrZn4v56y	MAS Holdings	\N	{2c8600bf-f6ab-4d01-85f8-c434ceba09c0,957c29df-b4d1-4d8e-9148-39cdaa94d146}
6dc332cc-c375-418e-b7fb-236337741a03	penguin	penguin@gmail.com	$2b$10$P/88zSqA/oIJmc/jAXdO8.KK8McihVgGisdEwB2uoNHnaB.sxgpBu	Penguin	\N	{2e9db007-e724-4807-a115-eb0056520332}
\.


--
-- Data for Name: interview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interview (id, "interviewDate", "interviewTime", status, "roomId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name) FROM stdin;
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, "roomNumber", "roomStatus", "interviewIds", "completedInterviewIds", "stallId", "roomName", floor) FROM stdin;
248e017a-3c00-4a8f-98de-d58cd23b3a38		vacant	\N	\N	446694b9-f88a-465d-add6-98d85a678c90	SCS lab 4	3
16527e02-51b3-40bc-9948-b963e30188a4		vacant	\N	\N	fab8d00e-6178-4c2e-9c92-5e1f8a559371	SCS LT 1	2
53a79715-e541-47a8-8084-1ce31dcfaf50		vacant	\N	\N	16454435-2e61-4458-bcd6-620e26b2845b	SCS LT 2	2
9e5d3d1a-2d90-4767-a5d8-df1327b3dad3		vacant	\N	\N	c0cc8b46-1d88-401e-ac9e-a21ffc390e20	SIIC Conference room	G
339a96f7-f73c-4113-82a1-3de4b9d446a8		vacant	\N	\N	8377d01f-a602-4acf-844b-19c6a2c37179	Physics lobby	2
f80e58c4-07a6-40af-8b70-02dce477c0fb		vacant	\N	\N	b07f8cd3-0b91-4aeb-b344-9cde732f23e7	Physics U25 room	2
c75064ba-2a1f-4a5f-bd1c-4a254dd8269a		vacant	\N	\N	53df409d-71ca-4640-9199-3cc8583d13cf	Physics U27 room	2
c5a2b5e1-e1a9-4ae7-8d0a-3da2de4b9d78		vacant	\N	\N	5c9065ac-c8b0-4159-a879-fd08c6b02dc9	Chemistry Auditorium	2
07358631-ee88-4abf-8561-166de78b9b8b		vacant	\N	\N	ad3e8946-3c87-4788-bd0d-53d716ca8bf7	SEU 208	2
f26b4263-c883-4039-b82b-b46852ab6894		vacant	\N	\N	5dbdabae-9d9b-4f30-9c8e-1ea8a959e728	ELTU 209	2
4d45a0ca-5a15-4317-9c7d-a4481a1fd248		vacant	\N	\N	6e966234-67b8-4fee-b294-f9cf92286e95	ELTU 210	2
ea24a0c5-e71a-461c-af93-6af1286ec56d		vacant	\N	\N	8519fb73-35bd-4579-b075-4c6cf3579a35	SEU conference room	2
238f7b42-743f-4094-ae68-925c4385227d		vacant	\N	\N	9b6ae7ae-8551-464a-b923-4cf40d3487e0	PGIS rooftop	3
634025bd-50e1-4790-97bd-d7a50a8baab8		vacant	\N	\N	67c35d5b-f1aa-4593-9242-6cc3c04d5a0a	Geology	G
a2e7b0d9-0cbf-47ae-87bc-1fcdd5305393	1	vacant	\N	\N	2c8600bf-f6ab-4d01-85f8-c434ceba09c0	Geology	1
8d8aadfe-84f4-4362-8509-77c99cb47757	2	vacant	\N	\N	957c29df-b4d1-4d8e-9148-39cdaa94d146	Geology	1
ef0330b3-3130-4b03-bb85-56d306a7fa39		vacant	\N	\N	2e9db007-e724-4807-a115-eb0056520332	SEU 203	2
\.


--
-- Data for Name: stall; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stall (id, "companyId", "roomId") FROM stdin;
446694b9-f88a-465d-add6-98d85a678c90	09e06519-7bf3-483e-953a-c0f94872f91c	248e017a-3c00-4a8f-98de-d58cd23b3a38
fab8d00e-6178-4c2e-9c92-5e1f8a559371	de26907a-c67b-4938-8c61-fecd7c2c0a5c	16527e02-51b3-40bc-9948-b963e30188a4
16454435-2e61-4458-bcd6-620e26b2845b	eacf1d8e-d986-4ab9-a78e-2f61e616f51a	53a79715-e541-47a8-8084-1ce31dcfaf50
c0cc8b46-1d88-401e-ac9e-a21ffc390e20	061b77c6-c634-4fcd-9067-647e06ff23e4	9e5d3d1a-2d90-4767-a5d8-df1327b3dad3
8377d01f-a602-4acf-844b-19c6a2c37179	44d42606-1e8b-4744-b6fb-02337aa60a8d	339a96f7-f73c-4113-82a1-3de4b9d446a8
b07f8cd3-0b91-4aeb-b344-9cde732f23e7	3ba4c8ac-9038-4271-bb07-2f43d819a4b5	f80e58c4-07a6-40af-8b70-02dce477c0fb
53df409d-71ca-4640-9199-3cc8583d13cf	74c3b6b1-c5e8-42f7-b9c3-c1c9a61d34e8	c75064ba-2a1f-4a5f-bd1c-4a254dd8269a
5c9065ac-c8b0-4159-a879-fd08c6b02dc9	06994777-7dec-4aa9-a329-96bbf958df37	c5a2b5e1-e1a9-4ae7-8d0a-3da2de4b9d78
ad3e8946-3c87-4788-bd0d-53d716ca8bf7	2fbd035b-c10d-4b1b-8064-ba117300543a	07358631-ee88-4abf-8561-166de78b9b8b
5dbdabae-9d9b-4f30-9c8e-1ea8a959e728	2fbd035b-c10d-4b1b-8064-ba117300543a	f26b4263-c883-4039-b82b-b46852ab6894
6e966234-67b8-4fee-b294-f9cf92286e95	2fbd035b-c10d-4b1b-8064-ba117300543a	4d45a0ca-5a15-4317-9c7d-a4481a1fd248
8519fb73-35bd-4579-b075-4c6cf3579a35	18f8b18c-e13e-41fb-a3d0-ea0d6f034388	ea24a0c5-e71a-461c-af93-6af1286ec56d
9b6ae7ae-8551-464a-b923-4cf40d3487e0	97971fab-6a64-4c6f-a28f-0397c1f61b80	238f7b42-743f-4094-ae68-925c4385227d
67c35d5b-f1aa-4593-9242-6cc3c04d5a0a	794bb94a-2a94-4e85-8dfc-4875fa5b4f70	634025bd-50e1-4790-97bd-d7a50a8baab8
2c8600bf-f6ab-4d01-85f8-c434ceba09c0	3a81b156-9282-4d92-b826-998bcbe2f8c5	a2e7b0d9-0cbf-47ae-87bc-1fcdd5305393
957c29df-b4d1-4d8e-9148-39cdaa94d146	3a81b156-9282-4d92-b826-998bcbe2f8c5	8d8aadfe-84f4-4362-8509-77c99cb47757
2e9db007-e724-4807-a115-eb0056520332	6dc332cc-c375-418e-b7fb-236337741a03	ef0330b3-3130-4b03-bb85-56d306a7fa39
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, username, email, password, name, "roleId", "studentId", "interviewIds") FROM stdin;
d9f631fb-04fb-496f-b990-ed77759357a3	johnLeonard	s17012@sci.pdn.ac.lk	$2b$10$6qZgvidrHBsxkjEfyOtZKuEDzc.hlZgv4pmCmZGqDA33OS7/oTgc2	John Leonard	\N	s17012	\N
fbad2805-970c-46b3-972c-dc7d14f29780	janeSmith	s17013@sci.pdn.ac.lk	$2b$10$4vZtmBNDnDY0cnanO4z22.vaAn0END/nvOu7pI.fGIJ.W5OTFZx9a	Jane Smith	\N	s17013	\N
21a20393-2314-40c1-99c8-236a3ce7e1df	davidJohnson	s17014@sci.pdn.ac.lk	$2b$10$jYsnXsE6MyqlJEFOWpWwReCOt..a617vLZPmp7NU/Pu806DmGdTtG	David Johnson	\N	s17014	\N
657a5dc4-2e8b-46bf-804a-c13a6071c8d9	sarahWilliams	s17015@sci.pdn.ac.lk	$2b$10$iX9GrkoHCxX.EfyvXgW.UeEaMQTliEf9fEG9r/9HCvQJH4oxycbL.	Sarah Williams	\N	s17015	\N
4fcfd148-9637-4d62-9741-5c335d5a5090	michaelBrown	s17016@sci.pdn.ac.lk	$2b$10$MnX6uM.iJ14hQ430sVq93OltUOP2EqHpqImh29cRQAFUmicph55oO	Michael Brown	\N	s17016	\N
657069e7-fdae-44e7-bd0c-6b90c000af7e	emilyDavis	s17017@sci.pdn.ac.lk	$2b$10$g46e5DKAIAEAEBHDVuNECem845F6xI6SM.DFzCq5e6uL4NV0AAzOW	Emily Davis	\N	s17017	\N
4cf75280-581a-4fc5-ab91-546853c0115a	jamesWilson	s17018@sci.pdn.ac.lk	$2b$10$MKtl6CP/IwgZJp5foRCu4ufMh7vok3W8ejw9rG1KCsO/LoaA3YsvO	James Wilson	\N	s17018	\N
ebf496c3-6679-4d0d-9d3c-1739412cbdbd	oliviaLee	s17019@sci.pdn.ac.lk	$2b$10$RHJg4i1nFiycN6CvnAtE0e1HcKddN/siBL4.0WbxPHFntKDvR8MSC	Olivia Lee	\N	s17019	\N
16efc64b-e27a-42d8-ad10-a88859f15cec	williamClark	s17020@sci.pdn.ac.lk	$2b$10$sM9kiqmZRwn.uu8Jfl4DrOizMX0fSScMIU3QQHdO2man3SDZxm3JW	William Clark	\N	s17020	\N
fc8cd419-9d5f-4542-a486-3822312b2658	avaMartinez	s17021@sci.pdn.ac.lk	$2b$10$dBG82OruT2MS4Y3wv25f/uqTGcSQ6kStHkQArjJLa.X7IvfRu.bK2	Ava Martinez	\N	s17021	\N
\.


--
-- Data for Name: student_interviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_interviews ("interviewId", "studentId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, name, "roleId") FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: company PK_056f7854a7afdba7cbd6d45fc20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);


--
-- Name: student PK_3d8016e1cb58429474a3c041904; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id);


--
-- Name: interview PK_44c49a4feadefa5c6fa78bfb7d1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview
    ADD CONSTRAINT "PK_44c49a4feadefa5c6fa78bfb7d1" PRIMARY KEY (id);


--
-- Name: student_interviews PK_47f0f497bed94db37292aae276b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_interviews
    ADD CONSTRAINT "PK_47f0f497bed94db37292aae276b" PRIMARY KEY ("interviewId", "studentId");


--
-- Name: stall PK_8429ac9dce652ffefb3fa122b36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stall
    ADD CONSTRAINT "PK_8429ac9dce652ffefb3fa122b36" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: room PK_c6d46db005d623e691b2fbcba23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: room REL_db6911fd18428ddc96e4bc445a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "REL_db6911fd18428ddc96e4bc445a" UNIQUE ("stallId");


--
-- Name: stall UQ_a773ec6b4591b83f83295f45f7f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stall
    ADD CONSTRAINT "UQ_a773ec6b4591b83f83295f45f7f" UNIQUE ("roomId");


--
-- Name: IDX_3881028818b69e5ac136c168aa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3881028818b69e5ac136c168aa" ON public.student_interviews USING btree ("studentId");


--
-- Name: IDX_5362685d13194bcbc1706991f7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5362685d13194bcbc1706991f7" ON public.student_interviews USING btree ("interviewId");


--
-- Name: student_interviews FK_3881028818b69e5ac136c168aa7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_interviews
    ADD CONSTRAINT "FK_3881028818b69e5ac136c168aa7" FOREIGN KEY ("studentId") REFERENCES public.student(id);


--
-- Name: student FK_42fa4c1daf11ce528801878e72b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "FK_42fa4c1daf11ce528801878e72b" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: interview FK_518631b71285919874b2f8f00af; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview
    ADD CONSTRAINT "FK_518631b71285919874b2f8f00af" FOREIGN KEY ("roomId") REFERENCES public.room(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: student_interviews FK_5362685d13194bcbc1706991f7b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_interviews
    ADD CONSTRAINT "FK_5362685d13194bcbc1706991f7b" FOREIGN KEY ("interviewId") REFERENCES public.interview(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stall FK_62a493588aa55446f9a5e6db04e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stall
    ADD CONSTRAINT "FK_62a493588aa55446f9a5e6db04e" FOREIGN KEY ("companyId") REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: company FK_8d6e97b0ff7c3d3dae08f51c1b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "FK_8d6e97b0ff7c3d3dae08f51c1b5" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stall FK_a773ec6b4591b83f83295f45f7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stall
    ADD CONSTRAINT "FK_a773ec6b4591b83f83295f45f7f" FOREIGN KEY ("roomId") REFERENCES public.room(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: room FK_db6911fd18428ddc96e4bc445a8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "FK_db6911fd18428ddc96e4bc445a8" FOREIGN KEY ("stallId") REFERENCES public.stall(id);


--
-- PostgreSQL database dump complete
--

