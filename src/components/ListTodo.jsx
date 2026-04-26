import { Title } from './title/Title';

export const ListTodo = ({ style, titleList, listArr, renderItem, emptyList, children }) => (
	<div className={style['list__wrapper']}>
		<Title text={titleList} className={style['list__title']} />
		{children}
		<ol className={style['list__container']}>
			{listArr.length === 0 ? (
				<div className={style['list__empty']}>{emptyList}</div>
			) : (
				listArr.map((item) => (
					<li
						key={item.id}
						className={
							item.completed
								? `${style['list__item']} ${style['list__item-completed']}`
								: style['list__item']
						}
					>
						{renderItem(item)}
					</li>
				))
			)}
		</ol>
	</div>
);
