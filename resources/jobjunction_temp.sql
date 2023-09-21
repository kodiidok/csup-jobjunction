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
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.company OWNER TO postgres;

--
-- Name: interview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview (
    "interviewDate" timestamp without time zone,
    "interviewTime" character varying,
    status character varying,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
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
    name character varying NOT NULL,
    division character varying,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    "roomNumber" character varying NOT NULL,
    "roomStatus" character varying NOT NULL,
    "currentStudent" character varying,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "stallId" uuid,
    "interviewIds" text,
    "completedInterviewIds" text
);


ALTER TABLE public.room OWNER TO postgres;

--
-- Name: stall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stall (
    "stallNumber" character varying NOT NULL,
    "floorPlanLocation" character varying NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "companyId" uuid
);


ALTER TABLE public.stall OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "studentId" character varying NOT NULL
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
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (username, email, password, name, "roleId", id) FROM stdin;
hemas	hemas@email.com	hemas	Hemas	\N	aaff3d5c-6c1e-457c-9aa8-a214d286ae3f
cbl	cbl@email.com	cbl	cbl	\N	96a62327-4cbb-4fd3-914b-8ebd57b93680
aayu	aayu@email.com	aayu	aayu	\N	5bbed243-e669-44b6-8c69-0df1e34da209
simcentric	simcentric@email.com	simcentric	simcentric	\N	46dcbe92-265b-4386-9af5-f6d40707b993
unilever	unilever@email.com	unilever	unilever	\N	ab3026e1-bfd2-42e2-be80-21d7d3d709a6
eyepax	eyepax@email.com	eyepax	eyepax	\N	98c9d329-0f62-4004-8720-e4f593d8cc31
octave	octave@email.com	octave	octave	\N	876f3733-51c0-41e3-9767-c463c58680a2
mainframe	mainframe@email.com	mainframe	mainframe	\N	a3a73750-ffbf-49ee-8511-afb8e0dfcfa1
haycarb	haycarb@email.com	haycarb	haycarb	\N	8f6a47ab-948d-4055-aa47-a80a02ea56ec
codegen	codegen@email.com	codegen	codegen	\N	2fa379e8-8e47-4ca9-bd72-58810b5cb92e
\.


--
-- Data for Name: interview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interview ("interviewDate", "interviewTime", status, id, "roomId") FROM stdin;
\N	\N	\N	060f7e02-b4a1-449b-a08c-fdcc3e597c8f	ff56d429-c717-4c3b-bcd8-938dc6f89d65
\N	\N	\N	56c5f372-a2e3-43b4-b933-2aa0e9a7d96a	b93d95a9-8d67-4192-9eae-7903deca80c8
\N	\N	\N	a822b287-72c9-4d73-81c4-2c03fa241524	861c9eb5-7435-4b55-8463-6b7c10a53d9d
\N	\N	\N	29b59831-bed0-4368-bf91-78ca6e12e361	c808d2f0-e758-4a6e-a6a9-8423db445530
\N	\N	\N	0153f0a9-603d-48c2-93ca-34ec44b28922	90eca163-dde5-4bbd-b323-73520aac9e75
\N	\N	\N	0ac3858e-6b39-44eb-a06c-bbd23c28568b	861c9eb5-7435-4b55-8463-6b7c10a53d9d
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (name, division, id) FROM stdin;
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room ("roomNumber", "roomStatus", "currentStudent", id, "stallId", "interviewIds", "completedInterviewIds") FROM stdin;
12	vacant	\N	90eca163-dde5-4bbd-b323-73520aac9e75	3469effd-1772-4000-996b-db6fea0b206a	{0153f0a9-603d-48c2-93ca-34ec44b28922}	\N
9	occupied	\N	c808d2f0-e758-4a6e-a6a9-8423db445530	ddb7bd48-9d22-478d-883f-923eec13d210	{29b59831-bed0-4368-bf91-78ca6e12e361}	\N
12	vacant	\N	b93d95a9-8d67-4192-9eae-7903deca80c8	981eae02-8b47-496b-94a5-49e20d148039	{56c5f372-a2e3-43b4-b933-2aa0e9a7d96a}	\N
1	occupied	\N	861c9eb5-7435-4b55-8463-6b7c10a53d9d	e0829c25-8f6d-471f-a626-875c18f76613	{a822b287-72c9-4d73-81c4-2c03fa241524,0ac3858e-6b39-44eb-a06c-bbd23c28568b}	\N
2	occupied	\N	ff56d429-c717-4c3b-bcd8-938dc6f89d65	2b0f0c32-9066-4a8f-80ec-d3e9a286c37a	{060f7e02-b4a1-449b-a08c-fdcc3e597c8f}	\N
\.


--
-- Data for Name: stall; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stall ("stallNumber", "floorPlanLocation", id, "companyId") FROM stdin;
1	GF-B3	2b0f0c32-9066-4a8f-80ec-d3e9a286c37a	aaff3d5c-6c1e-457c-9aa8-a214d286ae3f
2	GF-B1	981eae02-8b47-496b-94a5-49e20d148039	aaff3d5c-6c1e-457c-9aa8-a214d286ae3f
1	F1-B1	e0829c25-8f6d-471f-a626-875c18f76613	46dcbe92-265b-4386-9af5-f6d40707b993
1	F1-B2	3469effd-1772-4000-996b-db6fea0b206a	876f3733-51c0-41e3-9767-c463c58680a2
1	F3-B1	ddb7bd48-9d22-478d-883f-923eec13d210	2fa379e8-8e47-4ca9-bd72-58810b5cb92e
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (username, email, password, name, "roleId", id, "studentId") FROM stdin;
s18001	s18001@sci.pdn.ac.lk	s18001	s18001	\N	ad67d5f9-84fa-4134-a0fa-cb9e93198d72	s18001
s18002	s18002@sci.pdn.ac.lk	s18002	s18002	\N	c42cb1e6-f869-4a62-97a3-0205c9711091	s18002
s18003	s18003@sci.pdn.ac.lk	s18003	s18003	\N	e0d404f9-e66a-408d-b38d-18ee8b298203	s18003
s18004	s18004@sci.pdn.ac.lk	s18004	s18004	\N	0ee9faa9-8951-4b6c-bfb4-90485eca6afb	s18004
\.


--
-- Data for Name: student_interviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_interviews ("interviewId", "studentId") FROM stdin;
060f7e02-b4a1-449b-a08c-fdcc3e597c8f	ad67d5f9-84fa-4134-a0fa-cb9e93198d72
56c5f372-a2e3-43b4-b933-2aa0e9a7d96a	ad67d5f9-84fa-4134-a0fa-cb9e93198d72
56c5f372-a2e3-43b4-b933-2aa0e9a7d96a	c42cb1e6-f869-4a62-97a3-0205c9711091
56c5f372-a2e3-43b4-b933-2aa0e9a7d96a	e0d404f9-e66a-408d-b38d-18ee8b298203
56c5f372-a2e3-43b4-b933-2aa0e9a7d96a	0ee9faa9-8951-4b6c-bfb4-90485eca6afb
a822b287-72c9-4d73-81c4-2c03fa241524	ad67d5f9-84fa-4134-a0fa-cb9e93198d72
a822b287-72c9-4d73-81c4-2c03fa241524	c42cb1e6-f869-4a62-97a3-0205c9711091
29b59831-bed0-4368-bf91-78ca6e12e361	0ee9faa9-8951-4b6c-bfb4-90485eca6afb
0153f0a9-603d-48c2-93ca-34ec44b28922	ad67d5f9-84fa-4134-a0fa-cb9e93198d72
0153f0a9-603d-48c2-93ca-34ec44b28922	c42cb1e6-f869-4a62-97a3-0205c9711091
0153f0a9-603d-48c2-93ca-34ec44b28922	0ee9faa9-8951-4b6c-bfb4-90485eca6afb
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (username, email, password, name, "roleId", id) FROM stdin;
superadmin	superadmin	superadmin	Super Admin	\N	1626d6d0-41dc-4209-9343-cbac8108cc69
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
-- Name: room UQ_db6911fd18428ddc96e4bc445a8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "UQ_db6911fd18428ddc96e4bc445a8" UNIQUE ("stallId");


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

