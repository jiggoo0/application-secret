| table_name        | column_name   | data_type                | is_nullable | column_default               |
| ----------------- | ------------- | ------------------------ | ----------- | ---------------------------- |
| documents         | id            | uuid                     | NO          | gen_random_uuid()            |
| documents         | type          | text                     | NO          | null                         |
| documents         | ref_id        | text                     | NO          | null                         |
| documents         | status        | text                     | NO          | 'pending'::text              |
| documents         | qr_token      | text                     | NO          | null                         |
| documents         | pdf_url       | text                     | YES         | null                         |
| documents         | created_at    | timestamp with time zone | NO          | now()                        |
| documents         | updated_at    | timestamp with time zone | NO          | now()                        |
| documents         | metadata      | jsonb                    | YES         | null                         |
| leads             | id            | uuid                     | NO          | gen_random_uuid()            |
| leads             | created_at    | timestamp with time zone | NO          | timezone('utc'::text, now()) |
| leads             | name          | text                     | NO          | null                         |
| leads             | email         | text                     | YES         | null                         |
| leads             | phone         | text                     | YES         | null                         |
| leads             | message       | text                     | YES         | null                         |
| leads             | template_id   | text                     | YES         | null                         |
| leads             | category      | text                     | YES         | null                         |
| leads             | source_url    | text                     | YES         | null                         |
| leads             | status        | text                     | YES         | 'new'::text                  |
| leads             | admin_notes   | text                     | YES         | null                         |
| leads             | metadata      | jsonb                    | YES         | '{}'::jsonb                  |
| leads             | updated_at    | timestamp with time zone | YES         | timezone('utc'::text, now()) |
| product_stocks    | id            | uuid                     | NO          | uuid_generate_v4()           |
| product_stocks    | product_id    | uuid                     | YES         | null                         |
| product_stocks    | account_data  | text                     | NO          | null                         |
| product_stocks    | status        | text                     | YES         | 'available'::text            |
| product_stocks    | created_at    | timestamp with time zone | YES         | now()                        |
| product_stocks    | sold_at       | timestamp with time zone | YES         | null                         |
| products          | id            | uuid                     | NO          | uuid_generate_v4()           |
| products          | name          | text                     | NO          | null                         |
| products          | category      | text                     | NO          | null                         |
| products          | price         | double precision         | NO          | null                         |
| products          | description   | text                     | YES         | null                         |
| products          | created_at    | timestamp with time zone | YES         | now()                        |
| reviews           | id            | uuid                     | NO          | gen_random_uuid()            |
| reviews           | photo         | text                     | YES         | null                         |
| reviews           | name          | text                     | NO          | null                         |
| reviews           | author        | text                     | NO          | null                         |
| reviews           | text          | text                     | NO          | null                         |
| reviews           | rating        | smallint                 | NO          | null                         |
| reviews           | created_at    | timestamp with time zone | YES         | timezone('utc'::text, now()) |
| uploads           | id            | uuid                     | NO          | gen_random_uuid()            |
| uploads           | user_email    | text                     | NO          | null                         |
| uploads           | path          | text                     | NO          | null                         |
| uploads           | type          | text                     | YES         | null                         |
| uploads           | name          | text                     | YES         | null                         |
| uploads           | status        | text                     | YES         | 'pending'::text              |
| uploads           | created_at    | timestamp with time zone | YES         | now()                        |
| uploads           | extension     | text                     | YES         | null                         |
| uploads           | folder        | text                     | YES         | null                         |
| uploads           | size          | bigint                   | YES         | null                         |
| user_sessions     | id            | uuid                     | NO          | gen_random_uuid()            |
| user_sessions     | user_id       | text                     | NO          | null                         |
| user_sessions     | action        | text                     | NO          | null                         |
| user_sessions     | ip_address    | text                     | YES         | null                         |
| user_sessions     | user_agent    | text                     | YES         | null                         |
| user_sessions     | created_at    | timestamp with time zone | NO          | now()                        |
| users             | id            | uuid                     | NO          | gen_random_uuid()            |
| users             | email         | text                     | NO          | null                         |
| users             | password      | text                     | NO          | null                         |
| users             | name          | text                     | YES         | null                         |
| users             | role          | text                     | YES         | 'user'::text                 |
| users             | created_at    | timestamp with time zone | YES         | now()                        |
| users             | updated_at    | timestamp with time zone | YES         | now()                        |
| verification_docs | id            | uuid                     | NO          | uuid_generate_v4()           |
| verification_docs | verify_id     | text                     | NO          | null                         |
| verification_docs | case_id       | text                     | NO          | null                         |
| verification_docs | customer_name | text                     | NO          | null                         |
| verification_docs | doc_type      | text                     | NO          | null                         |
| verification_docs | status        | text                     | YES         | 'PROCESSING'::text           |
| verification_docs | issued_at     | timestamp with time zone | YES         | null                         |
| verification_docs | expired_at    | timestamp with time zone | YES         | null                         |
| verification_docs | created_at    | timestamp with time zone | YES         | now()                        |
| verification_docs | updated_at    | timestamp with time zone | YES         | now()                        |
| verifications     | id            | uuid                     | NO          | gen_random_uuid()            |
| verifications     | ticket_id     | text                     | NO          | null                         |
| verifications     | holder_name   | text                     | NO          | null                         |
| verifications     | document_type | text                     | NO          | null                         |
| verifications     | status        | text                     | NO          | 'PENDING'::text              |
| verifications     | metadata      | jsonb                    | YES         | '{}'::jsonb                  |
| verifications     | verified_by   | text                     | YES         | null                         |
| verifications     | issued_at     | timestamp with time zone | YES         | now()                        |
| verifications     | expires_at    | timestamp with time zone | YES         | null                         |
| verifications     | created_at    | timestamp with time zone | YES         | now()                        |
| verifications     | updated_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | id            | uuid                     | NO          | gen_random_uuid()            |
| wiki_posts        | slug          | text                     | NO          | null                         |
| wiki_posts        | title         | text                     | NO          | null                         |
| wiki_posts        | description   | text                     | YES         | null                         |
| wiki_posts        | content       | text                     | YES         | null                         |
| wiki_posts        | category      | text                     | YES         | 'General'::text              |
| wiki_posts        | author_name   | text                     | YES         | null                         |
| wiki_posts        | author_role   | text                     | YES         | null                         |
| wiki_posts        | tags          | ARRAY                    | YES         | null                         |
| wiki_posts        | image         | text                     | YES         | null                         |
| wiki_posts        | is_published  | boolean                  | YES         | false                        |
| wiki_posts        | created_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | updated_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | published_at  | timestamp with time zone | YES         | now()                        |
