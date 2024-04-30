create database if not exists compostlab;
use compostlab;
create table if not exists usuario(email_usuario varchar(50) primary key,
    nombres varchar(250) not null,apellido varchar(250) not null,
    cedula varchar(20)not null,telefono varchar(50),
    contrasenia varchar(250) not null,
    activeMercado smallint(1) default 0,activeLote smallint(1) default 0,
    activeHistorial smallint(1) default 0,activeDespacho smallint(1) default 0,
    activeReporte smallint(1) default 0,activeNotificacion smallint(1) default 0,
    activeRecordatorio smallint(1) default 0,estado smallint(1) default 1);
alter table usuario add column activeUsuarios smallint(1) default 0;
alter table usuario add column activeInsumo smallint(1) default 0;
create table if not exists mercado(id_mercado int auto_increment primary key,nombre_mercado varchar(250) not null,
                     encargado_mercado varchar(250) not null,email_mercado varchar(250) not null,
                     telefono_mercado varchar(250) not null,dire_mercado varchar(250) not null,
                     estado smallint(2) default 1);
create table if not exists tipo_insumo(id_tipo_insumo int primary key auto_increment,nombreTipoInsumo varchar(250));
create table if not exists insumo(id_insumo int auto_increment primary key, nombre_insumo varchar(250) not null,
                                  origin_insumo varchar(250) not null,fk_id_tipo_insumo int not null,
                                  cantidad_insumo int default 1000,precio_insumo decimal(10,2) default 0.00,
                                  decrip_insumo varchar(250),activo smallint(1) default 1);
alter table insumo add constraint rel_insumo_tipo_insumo foreign key insumo(fk_id_tipo_insumo) references tipo_insumo(id_tipo_insumo);
create table if not exists tipo_peso(id_tipo_peso int auto_increment primary key,detalle_tipo_peso varchar(250) not null,
                                       activo smallint(1) default 1);
create table lote(id_lote int primary key auto_increment,nombre_lote varchar(250) not null,
                  fechaIngreso datetime default now(),fechaDespacho datetime default null,
                  fechaSalida datetime default null,
                  observacion_lote text,
                  peso int default 1,
                  fk_tipo_peso int not null,
                  fk_email_usuario varchar(50) not null,
                  fk_id_mercado int not null,
                  activo smallint(1) default 1);
alter table lote add column dia_notificacion smallint(2) default 0;
alter table lote add column FkIDFase int default 1;
alter table lote add constraint rel_tipo_peso_lote foreign key lote(fk_tipo_peso) references tipo_peso(id_tipo_peso);
alter table lote add constraint rel_email_lote foreign key lote(fk_email_usuario) references usuario(email_usuario);
alter table lote add constraint rel_mercado_lote foreign key lote(fk_id_mercado) references mercado(id_mercado);
alter table lote add constraint rel_fase_lote foreign key lote(FkIDFase) references fases(idFase);
alter table lote add column ultimaNotificacion datetime default now();
create table insumo_lote(id_insumo_lote int auto_increment primary key,fk_id_lote int not null,fk_id_insumo int not null,
             cantidad int default 0,fecha_ingreso datetime default now());
alter table insumo_lote add constraint rel_insumo_lote_insumo foreign key insumo_lote(fk_id_insumo) references insumo(id_insumo);
alter table insumo_lote add constraint rel_insumo_lote_lote foreign key insumo_lote(fk_id_lote) references lote(id_lote);

create table historial_lote(id_historial_lote int auto_increment primary key ,vTemperatura decimal(10,2) default 0.00,
                            vHumedad decimal(10,2) default 0.00,vPh decimal(10,2) default 0.00,
                            vOxigeno decimal(10,2) default 0.00,detalleHistorial text,
                            fechaHistorial datetime default now(),
                            FK_lote int not null );

alter table historial_lote add constraint rel_historial_lote_lote foreign key historial_lote(FK_lote) references lote(id_lote);

create table fases (idFase int auto_increment primary key,detalleFase varchar(250) not null,
                    minValorFase smallint(2) default 0,maxValorFase smallint(2) default 0,estado smallint(2) default 1);
create table alertas(idAlerta int auto_increment primary key,FK_Lote int not null,isVisto smallint(2) default 0);
alter table alertas add constraint alerta_lote foreign key alertas(FK_Lote) references lote(id_lote);

create table lote_salida(idLoteSalida int auto_increment primary key,FK_Lote int not null,
                         FK_Email_Usuario_Salida varchar(50) not null);
alter table lote_salida add constraint rel_lote_salida_lote foreign key lote_salida(FK_Lote) references lote(id_lote);
alter table lote_salida add constraint rel_lote_salida_usuario foreign key lote_salida(FK_Email_Usuario_Salida)
                        references usuario(email_usuario);
alter table usuario add column activeEntrada smallint(1) default 1;
alter table usuario add column active_options_Entrada smallint(1) default 1;
-- SQL DEFECTOS

create trigger updateFaseLoteTemperaturaTrigger after insert on historial_lote
    for each row
    begin
        call updateFaseLoteTemperatura(new.FK_lote,new.vTemperatura);
    end;

create procedure updateFaseLoteTemperatura(in lote_ int,in temperatura decimal(10,2))
       begin
           declare idTipoFase int default 0;
           set idTipoFase = (select FkIDFase from lote where id_lote = lote_);
           update lote set FkIDFase = (select idFase from fases where temperatura between minValorFase and maxValorFase and estado = 1 and idFase > idTipoFase limit 1) where id_lote = lote_;
       end;

create definer = root@`%` event creacionAlertas on schedule
    every '1' DAY
        starts '2023-06-26 05:00:00'
    on completion preserve
    enable
    do
    begin
         delete from alertas;

         insert into alertas (FK_Lote) select table1.id_lote from (select L.id_lote,date(L.fechaIngreso) fechaIngreso,
                date_add(date(L.ultimaNotificacion),
                interval L.dia_notificacion DAY) fechaNotification,
                L.dia_notificacion from lote as L inner join mercado as M on M.id_mercado = L.fk_id_mercado
                inner join fases as F on L.FkIDFase = F.idFase where L.activo = 1
                and ISNULL(L.fechaSalida) and ISNULL(L.fechaDespacho) and L.dia_notificacion > 0) as table1
                where table1.fechaNotification = date(now());
         update lote set ultimaNotificacion = now();
     end;

CREATE PROCEDURE addLoteSalida (IN lote_ INT, IN email_ VARCHAR(50))
BEGIN
    DECLARE fecha_ DATETIME DEFAULT NOW();
    DECLARE estado INT DEFAULT 200;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET estado = 400;
    END;

    START TRANSACTION;

    UPDATE lote SET fechaSalida = fecha_ WHERE id_lote = lote_;
    INSERT INTO lote_salida (FK_Lote, FK_Email_Usuario_Salida) VALUES (lote_, email_);

    COMMIT;

    SELECT estado AS estado;
END;

CREATE TRIGGER update_peso_lote
AFTER INSERT ON lote
FOR EACH ROW
BEGIN
    declare cant_organica_mercado_ decimal(10,2) default 0.00;
    declare peso_lote_kg decimal(10,2) default 0.00;
    set cant_organica_mercado_ = (select cant_organica_mercado from mercado where id_mercado = new.fk_id_mercado);

    if new.fk_tipo_peso = 1 then
        set peso_lote_kg = (new.peso * 1000);
    end if;

    if new.fk_tipo_peso = 2 then
        set peso_lote_kg = (new.peso * 0.453592);
    end if;

    set cant_organica_mercado_ =  (cant_organica_mercado_ - peso_lote_kg);
    update mercado set cant_organica_mercado = cant_organica_mercado_ where id_mercado = new.fk_id_mercado;
END;


insert into fases(detalleFase, minValorFase, maxValorFase) VALUES ('Sin Fase',0,0);
insert into fases(detalleFase, minValorFase, maxValorFase) VALUES ('Fase Mesófila ',15,45);
insert into fases(detalleFase, minValorFase, maxValorFase) VALUES ('Fase Termófila ',45,70);
insert into fases(detalleFase, minValorFase, maxValorFase) VALUES ('Fase Mesófila II',40,45);
insert into fases(detalleFase, minValorFase, maxValorFase) VALUES ('Fase de Maduración',0,40);

insert into usuario(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
            VALUES ('guaman1579@gmail.com','NELSON PATRICIO','YUNGA GUAMAN','0604666982','',MD5('12345678'));
insert into mercado(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado) VALUES
                    ('Mercado San Alfonso','Luis Juca','malfonso@gmail.com','0556267822','Riobamba - Los Alamos');
insert into tipo_insumo(nombreTipoInsumo) values ('ORGANICO');
insert into tipo_insumo(nombreTipoInsumo) values ('INORGANICO');
insert into tipo_insumo(nombreTipoInsumo) values ('50 ORGANICO - 50 INORGANICO');
insert into insumo(nombre_insumo, origin_insumo, fk_id_tipo_insumo, cantidad_insumo, precio_insumo, decrip_insumo)
                  VALUES ('INSUMO 001','S/N',1,100,10.23,'INSUMO ORGANICO 001');
insert into tipo_peso(detalle_tipo_peso) values ('TONELADA');
insert into tipo_peso(detalle_tipo_peso) values ('LIBRAS');
insert into tipo_peso(detalle_tipo_peso) values ('KILOS');

-- CONSULTAS
use compostlab;
select * from lote;

update lote set nombre_lote = 'Pila-Mayorista-001',peso = 136,fk_tipo_peso =3,fk_id_mercado = 6,
                dia_notificacion = 1,observacion_lote = 'S/N',activo = 1,fk_id_residuo = 1,FkIDFase=3 where id_lote = 36
